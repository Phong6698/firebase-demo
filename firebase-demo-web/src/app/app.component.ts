import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {environment} from '../environments/environment';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, shareReplay, switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'firebase-demo-web';
  isProd = environment.production;
  version = environment.version;

  messages$: Observable<{}>;

  user$: Observable<any>;

  constructor(public angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore,
              private angularFireMessaging: AngularFireMessaging) {
  }

  ngOnInit(): void {

    // FIXME does not work https://github.com/angular/angularfire/issues/1904
    this.messages$ = this.angularFireMessaging.messages.pipe(
      tap(console.log)
    );

    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(authState => {
        if (authState) {
          return this.angularFirestore.collection('Users').doc(authState.uid).valueChanges();
        } else {
          return of(null);
        }
      }),
      shareReplay(1)
    );

    this.angularFireMessaging.tokenChanges.pipe(
      switchMap(token => {
        console.log(token);
        return this.user$.pipe(map(user => {
          return {user, fcmToken: token};
        }));
      })
    ).subscribe(data => {
      const currentTokens = data.user.fcmTokens || {};
      // If token does not exist in firestore, update db
      if (!currentTokens[data.fcmToken]) {
        const tokens = {...currentTokens, [data.fcmToken]: true};
        this.angularFirestore.collection('Users').doc(data.user.uid).update({fcmTokens: tokens});
      }
    });
  }

  loginGoogle() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(async user => {
      if (user.additionalUserInfo.isNewUser) {
        await this.angularFirestore.collection('Users').doc(user.user.uid).set({uid: user.user.uid});
      }
    });
  }

  loginGithub() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GithubAuthProvider().addScope('name'));
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  requestPermission() {
    this.angularFireMessaging.requestPermission.toPromise()
      .then(() => {
        console.log('Permission granted!');
      })
      .catch(error => {
        console.error(error);
      })
  }

  async sendExampleNotification() {
    const user = await this.user$.pipe(take(1)).toPromise();
    console.log('Send example Notification to', user);
    this.angularFirestore.collection('Messages').add(
      {
        uid: user.uid,
        payload: {
          notification: {
            title: 'This is the title',
            body: 'This is the body'
          }
        }
      }
    )
  }


}
