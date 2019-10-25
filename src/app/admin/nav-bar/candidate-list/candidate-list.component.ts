import { Component, OnInit } from '@angular/core';
import {CandidateListService} from "./candidate-list.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidate:any;
  nominatedCandidate:any;
  constructor(private service :CandidateListService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllCandidate();
    this.getAllNominatedCandidate();
  }

  getAllCandidate(){
    this.service.getAllCandidate()
      .subscribe(redata=>{
        this.candidate=redata;
        console.log(redata);
      })
  }

  getCandidate(data: any) {
      this.candidate=data;
  }

  partyNomination() {
    this.service.partyNomination(this.candidate.id , this.candidate.partyModel.id)
      .subscribe(
        reData => {
          console.log(reData);
          if (reData.statusDescription == "Success") {
            this.snackBar.open("Successfully candidate  nominated" , "OK");
          }else {
            alert(reData.statusDescription);
          }
        });
  }
  getAllNominatedCandidate(){
    this.service.getAllNominatedCandidate()
      .subscribe(
        reData => {
          console.log(reData);
          this.nominatedCandidate=reData;
        });
  }

  generateCandidateNo() {
    this.service.generateCandidateNo()
      .subscribe(
        reData => {
          console.log(reData);
          // this.nominatedCandidate=reData;
          if (reData.statusDescription == "Success") {
            this.snackBar.open("Successfully candidate  number generated" , "OK");
          }else {
            alert(reData.statusDescription);
          }
        });
  }
}
