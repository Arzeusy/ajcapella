import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
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

   constructor(
     private route: Router,
     private userService: UserService,
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
          this.route.navigate(["/Calendar"]);
        }
      )
      .catch(
        error => console.error(error)
      );

  }

  loginWithGoogle(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();

    this.userService.loginGoogle()
      .then(
        response => {
          console.log(response);
          this.route.navigate(["/Calendar"]);
        }
      )
      .catch(
        error => console.error(error)
      );

  }

}
