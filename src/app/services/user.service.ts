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
    return signOut(this.auth);
  }

  loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

}
