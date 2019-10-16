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
  image:File;

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
    this.service.saveParty(this.partyForm.value , this.image)
      .subscribe(
        value => {
          if (value.statusDescription =="Success"){
            alert(value.statusDescription)
          }else {
            alert(value.statusDescription + " | Already this color was selected!")
          }
          console.log(value);

        },
      );
  }


  //image preview
  public imagePath;
  imgURL: any;
  public message: string;
  preview(event , files) {
    this.image=event.target.files[0];
    console.log(this.image);

    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
