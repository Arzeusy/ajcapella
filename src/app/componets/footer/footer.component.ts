import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingresa un correo electronico';
    }

    return this.email.hasError('email') ? 'Email no valido' : '';
  }


  redirectLink(type: number) {
 
    switch(type) {
      case 0:
          window.location.href = "https://www.facebook.com/Ajcapella15";
        break;
      case 1:
          window.location.href = "https://wa.me/+50585909017";
        break;
      default:
          window.location.href = "https://www.facebook.com/Ajcapella15";
    }
    
  }

}
