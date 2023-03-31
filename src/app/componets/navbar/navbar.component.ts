import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  hide = true;
  formReg: FormGroup;
  TypeForm = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
   constructor(
     private route: Router,
     private userService: UserService,
     private _snackBar: MatSnackBar
   ) {
     this.formReg = new FormGroup({
       email: new FormControl(),
       password: new FormControl()
     });

  }


  watchCalendar() {
    this.route.navigate(['/Calendar']);
  }

  gohome() {
    this.route.navigate(['/']);
  }
  
  sendInformation(menuTrigger: MatMenuTrigger) {
    if (this.TypeForm) this.onSubmit(menuTrigger);
    else this.onRegister(menuTrigger);
  }

  onRegister(menuTrigger: MatMenuTrigger) {
    console.log(this.formReg.value);
    menuTrigger.closeMenu();

    this.userService.register(this.formReg.value)
      .then(
        response => {
          console.log(response);
          this.userService.sendVerificatin(response.user);
          this.route.navigate(["/Calendar"]);
        }
      )
      .catch(
        error => console.error(error)
      );

  }


  onSubmit(menuTrigger: MatMenuTrigger) {
    console.log(this.formReg.value);
    menuTrigger.closeMenu();

    this.userService.login(this.formReg.value)
      .then(
        response => {
          console.log(response);
          if (response.user.emailVerified == false) {
              this._snackBar.open('Usuario no verificado, verifique su correo', 'Aceptar', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
          } else {
            let user = response.user;
            this.userService.saveData({ displayName: user.displayName, email: user.email, idToken : user.uid, refreshToken: "", urlPhoto: user.photoURL })
            this.route.navigate(["/Calendar"]);
            this._snackBar.open('Bienvenido de nuevo!!!', 'Aceptar', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }

        }
      )
      .catch(
        error => {
          this._snackBar.open('Email o Password no es correcto', 'Aceptar', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
        }
      );

  }

  loginWithGoogle(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();

    this.userService.loginGoogle()
      .then(
        response => {
          let user = response.user;
          this.userService.saveData({ displayName: user.displayName, email: user.email, idToken : user.uid, refreshToken: "", urlPhoto: user.photoURL })
          this.route.navigate(["/Calendar"]);
          this._snackBar.open('Bienvenido de nuevo!!!', 'Aceptar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });

        }
      )
      .catch(
          error => {
          this._snackBar.open('Email o Password no es correcto', 'Aceptar', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
        }
      );

  }


  loginWithFacebook(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();

    this.userService.loginFacebook()
      .then(
        response => {
          let user = response.user;
          this.userService.saveData({ displayName: user.displayName, email: user.email, idToken : user.uid, refreshToken: "", urlPhoto: user.photoURL })
          this.route.navigate(["/Calendar"]);
          this._snackBar.open('Bienvenido de nuevo!!!', 'Aceptar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      )
      .catch(
        error => {
          this._snackBar.open('Email o Password no es correcto', 'Aceptar', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
        }
      );

  }

  changeTypeForm() {
    this.TypeForm = !this.TypeForm;

  }

  get userData() {
    return localStorage.getItem("accessToken");
  }

  get userPhotoData() {
      let photo = localStorage.getItem("photoURL");
      if (photo == "null") {
        return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      }else return photo
  }

  logout(menuTrigger: MatMenuTrigger) {
    this.userService.logout()
      .then(
        response => {
          menuTrigger.closeMenu();
          this.route.navigate(["/"]);
          this._snackBar.open('Te esperamos nuevamente!!!', 'Aceptar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      )
      .catch(
         error => {
          this._snackBar.open('Email o Password no es correcto', 'Aceptar', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
        }
      );
  }
  

}
