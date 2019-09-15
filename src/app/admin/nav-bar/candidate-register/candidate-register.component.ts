import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CandidateRegisterService} from "./candidate-register.service";

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css']
})
export class CandidateRegisterComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['President Election', 'Lok sabha election', 'Parliament Election'];
  partyModel: any;
  candidateForm: FormGroup;

  constructor(private service: CandidateRegisterService,
              private formbuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getPartyName();

    this.candidateForm = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      partyModelId: new FormControl('', Validators.required),
      voterId: new FormControl('', Validators.required),
      pno: new FormControl('', Validators.required)
      // logoUrl: new FormControl('default')
    });
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
            alert(value.statusDescription)
          } else {
            alert(value.statusDescription + "try again")
          }
          console.log(value);
        },
      );
  }
}
