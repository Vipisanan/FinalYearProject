import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css']
})
export class CandidateRegisterComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['President Election', 'Lok sabha election', 'Parliament Election'];

  constructor() { }

  ngOnInit() {
  }

}
