import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CandidateRegisterService} from "./candidate-register.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css']
})
export class CandidateRegisterComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['President Election', 'Lok sabha election', 'Parliament Election'];
  activeElectionModel: any;
  partyModel: any;
  candidateForm: FormGroup;

  constructor(private service: CandidateRegisterService,
              private formbuilder: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getPartyName();
    this.getAllActiveElectionList();

    this.candidateForm = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      partyModelId: new FormControl('', Validators.required),
      voterId: new FormControl('', Validators.required),
      pno: new FormControl('', Validators.required)
      // logoUrl: new FormControl('default')
    });
  }

  getAllActiveElectionList(){
    this.service.getAllActiveElectionList()
      .subscribe(
        value => {
          this.activeElectionModel = value;
          console.log(this.activeElectionModel);
          console.log(this.activeElectionModel[0].electionTypeModel.type);
        },
      );
  }

  getPartyName() {
    this.service.getPartyName()
      .subscribe(
        value => {
          this.partyModel = value;
          console.log(this.partyModel);
        },
      );
  }

  onSubmit() {
    console.log(this.candidateForm.value);
    this.service.addCandidate(this.candidateForm.value)
      .subscribe(
        value => {
          if (value.statusDescription = "Success") {
            this.snackBar.open("Successfully registered");
          } else {
            alert(value.statusDescription + "try again")
          }
          console.log(value);
        },
      );
  }
}
