import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/shared/model/user.model';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  public _userSource = new BehaviorSubject<User>(new User);
  currentUser$ = this._userSource.asObservable();
  currentUser: User;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState;
  }

  getUser$() {
    return this.user$;
  }

  register(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmail(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logout() {
    this.afAuth
      .signOut()
      .then((data) => {
        console.log('SIGNOUT');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('SIGNOUT ERROR', error);
      });
  }
}
