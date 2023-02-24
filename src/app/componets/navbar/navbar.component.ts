import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

   constructor(
    private route: Router,
  ) {
  }


  watchCalendar() {
    this.route.navigate(['/Calendar']);
  }

  gohome() {
    this.route.navigate(['/']);
    
  }

}
