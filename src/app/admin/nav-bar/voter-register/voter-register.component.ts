import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VoterRegisterService} from './voter-register.service';
import {GsDivisionModel} from '../../models/GsDivisionModel';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {VoterRegisterModel} from "../../models/VoterRegisterModel";

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-voter-register',
  templateUrl: './voter-register.component.html',
  styleUrls: ['./voter-register.component.css']
})

export class VoterRegisterComponent implements OnInit {
  gsDivisionDatas: GsDivisionModel[];
  voterRegisterModel:VoterRegisterModel[];
  voterForm: FormGroup;
  isSubitted = false;

  myControl = new FormControl();
  options: string[] = ['Mullaitivu', 'Vavuniya', 'Colombo'];


  constructor(private service: VoterRegisterService,
              private formbuilder: FormBuilder,
              public dialog: MatDialog) {
  }

  get f() {
    return this.voterForm.controls;
  }

  ngOnInit() {
    this.openDialog();
    this.voterForm = this.formbuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gsDivisionId: new FormControl('', Validators.required),
      nicNo: new FormControl('', [Validators.required ,
                                                          Validators.min(12)]),
      specificDetails: new FormControl('', Validators.required)
    });
    this.getAllGSDivision();
  }

  getAllGSDivision() {
    this.service.getAllGSDivision()
      .subscribe(
        value => {
          this.gsDivisionDatas = value;
          console.log(this.options);
          console.log(value);
        },
      );
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
  }

  //for register voter
  onSubmit() {
    this.isSubitted = true;

    // stop here if form is invalid
    if (this.voterForm.invalid) {
      return;
    }

    console.log('onSubmit method call');
    this.openDialog();
    console.log(this.voterForm.value);
    this.voterRegisterModel = this.voterForm.value;
    // @ts-ignore
    this.voterRegisterModel.userType = 1;

    console.log(this.voterRegisterModel);
    this.voterRegister();

  }

  voterRegister(){
    this.service.voterRegister(this.voterRegisterModel)
      .subscribe(
        reData => {
          console.log(reData);
          if (reData.statusDescription == "Success") {
            alert(reData.statusDescription + "Success")
          }else {
            alert(reData.statusDescription + "try again");
          }
        });

  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
