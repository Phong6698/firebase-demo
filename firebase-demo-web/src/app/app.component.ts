import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-demo-web';

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
