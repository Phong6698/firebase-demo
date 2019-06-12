import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-demo-web';
  isProd = environment.production;
  version = environment.version;

  constructor(public angularFireAuth: AngularFireAuth) {}

  loginGoogle() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginGithub() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GithubAuthProvider().addScope('name'));
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
