import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "Calendar", component: CalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
