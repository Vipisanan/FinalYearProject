import { Component, OnInit } from '@angular/core';
import {CandidateListService} from "./candidate-list.service";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidate:any;
  constructor(private service :CandidateListService) { }

  ngOnInit() {
    this.getAllCandidate();
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
}
