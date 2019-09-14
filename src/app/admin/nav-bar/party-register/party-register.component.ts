import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PartyRegisterService} from "./party-register.service";


@Component({
  selector: 'app-party-register',
  templateUrl: './party-register.component.html',
  styleUrls: ['./party-register.component.css']
})
export class PartyRegisterComponent implements OnInit {

  partyForm: FormGroup;
  // partyColorModel:PartyColorModel[];
  partyColorModel:any[];

  constructor(private formbuilder: FormBuilder,
              private service:PartyRegisterService) { }

  get f() {
    return this.partyForm.controls;
  }

  ngOnInit() {
    this.partyForm = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      partyColourId: new FormControl('', Validators.required),
      logoUrl: new FormControl('default')
    });
    this.getPartyColor();
  }

  getPartyColor(){
      this.service.getPartyColor()
        .subscribe(
          value => {
            this.partyColorModel = value;
            console.log(value);
          },
        );
  }

  onSubmit() {
    console.log(this.partyForm.value);
    this.service.saveParty(this.partyForm.value)
      .subscribe(
        value => {
          if (value.statusDescription =="Success"){
            alert(value.statusDescription)
          }else {
            alert(value.statusDescription)
          }
          console.log(value);

        },
      );
  }
}
