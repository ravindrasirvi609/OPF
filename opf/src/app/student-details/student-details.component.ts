import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student = {
    name: 'John Doe',
    age: 18,
    grade: '12th',
    address: '123 Main St, City'
  };

  constructor() { }

  ngOnInit() {
  }
}
