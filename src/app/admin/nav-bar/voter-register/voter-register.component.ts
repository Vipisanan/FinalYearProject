import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-voter-register',
  templateUrl: './voter-register.component.html',
  styleUrls: ['./voter-register.component.css']
})
export class VoterRegisterComponent implements OnInit {


  myControl = new FormControl();
  options: string[] = ['Mullaitivu', 'Vavuniya', 'Colombo'];

  constructor() {
  }

  ngOnInit() {
  }

}
