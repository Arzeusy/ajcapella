import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as myCourses from "./courses"
@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.scss']
})
export class CourseDescriptionComponent implements OnInit {

  SelectedCourse: any;
  idCourse: number;

  constructor(private route: ActivatedRoute) {
    this.idCourse = Number(this.route.snapshot.paramMap.get("id"));
  }
  
  ngOnInit(): void {
    this.SelectedCourse = myCourses.courses[this.idCourse - 1];
  }




}
