import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  title = "Discipulado para Principiantes";
  subTitle = "Rider Reyes en memoria";
  title2 = "#AJMARTUREO";
  subtitle2 = "Mira lo que piensan algunos miembros de nuestra Sociedad de Conocimiento"
  textureState = true;
  align = "l";

 constructor(
    private route: Router,
  ) {
  }

  watchCalendar() {
    this.route.navigate(['/Calendar']);
  }
}
