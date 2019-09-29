import { Component, OnInit } from '@angular/core';
import {CandidateListService} from "./candidate-list.service";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidate:any;
  nominatedCandidate:any;
  constructor(private service :CandidateListService) { }

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
            alert(reData.statusDescription + "Successfully candidate  nominated")
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
            alert(reData.statusDescription + "Successfully candidate  number generated")
          }else {
            alert(reData.statusDescription);
          }
        });
  }
}
