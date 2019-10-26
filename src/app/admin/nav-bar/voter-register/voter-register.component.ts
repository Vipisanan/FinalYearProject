import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VoterRegisterService} from './voter-register.service';
import {GsDivisionModel} from '../../models/GsDivisionModel';
import {MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
import {VoterRegisterModel} from "../../models/VoterRegisterModel";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-voter-register',
  templateUrl: './voter-register.component.html',
  styleUrls: ['./voter-register.component.css']
})

export class VoterRegisterComponent implements OnInit {
  gsDivisionDatas: GsDivisionModel[];
  voterRegisterModel: VoterRegisterModel[];
  voterForm: FormGroup;
  isSubitted = false;
  image: File;

  myControl = new FormControl();
  options: string[] = ['Mullaitivu', 'Vavuniya', 'Colombo'];
  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private service: VoterRegisterService,
              private formbuilder: FormBuilder,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  get f() {
    return this.voterForm.controls;
  }

  ngOnInit() {
// Load the given component into the snack-bar.
    this.voterForm = this.formbuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gsDivisionId: new FormControl('', Validators.required),
      nicNo: new FormControl('', [Validators.required,
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
    this.dialog.open(DialogDataExampleDialog);
  }

  onSubmit() {
    this.isSubitted = true;
    // stop here if form is invalid
    if (this.voterForm.invalid) {
      return;
    }
    console.log('onSubmit method call');
    console.log(this.voterForm.value);
    this.service.voterRegister(this.voterForm, this.image)
      .subscribe(
        reData => {
          console.log(reData);
          if (reData.statusDescription == "Success") {
            this.snackBar.open('Successfully voter added', 'OK');
            this.voterForm.reset();
            // alert(reData.statusDescription + "Success")
          } else {
            alert(reData.statusDescription + "try again");
          }
        });
  }

  preview(event, files) {
    this.image = event.target.files[0];
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

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(private dialogRef: MatDialogRef<DialogDataExampleDialog>) {
    dialogRef.disableClose = true;
  }

}
