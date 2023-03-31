import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, sendEmailVerification
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
  ) { }

  register({email, password}:any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

   sendVerificatin(user:any) {
    return sendEmailVerification(user);
  }


  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("photoURL");
    localStorage.removeItem("displayName");

    return signOut(this.auth);
  }

  loginGoogle() {
     return signInWithPopup(this.auth, new GoogleAuthProvider())
    
  }

  loginFacebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  saveData({ displayName, email, idToken, refreshToken, urlPhoto}:any) {
    localStorage.setItem("accessToken", idToken);
    localStorage.setItem("email", email);
    localStorage.setItem("photoURL", urlPhoto);
    localStorage.setItem("displayName", displayName);
  }
}
