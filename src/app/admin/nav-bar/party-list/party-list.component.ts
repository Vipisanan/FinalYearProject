import { Component, OnInit } from '@angular/core';
import {PartyListService} from "./party-list.service";

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {
  private partyList: any;
  private partyId: any;
  private electionId: any;
  private party: any;
  private activeElection: any;
  private nominatedElection: any;


  constructor(private service:PartyListService) { }

  ngOnInit() {
    this.getPartyList();
    this.getAllNominatedParty();
    this.getAllActiveElection();
  }

  getPartyList(){
    this.service.getPartyList()
      .subscribe(
        reData => {
          console.log(reData);
          this.partyList = reData;
        });
  }

  getParty(party: any) {
console.log(party);
    this.party = party;
  }

  partyNomination(id){
    this.partyId = id;
    console.log(id);
    this.service.partyNomination(this.electionId ,id)
      .subscribe(
        reData => {
          console.log(reData);
          if (reData.statusDescription == "Success") {
            alert(reData.statusDescription + " :) Successfully party nominated")
          }else {
            alert("this party already selected")
          }
        });
  }
  getElectioTypeId(id) {
    this.electionId = id;
    console.log(id , "id")
  }

  getAllActiveElection(){
    console.log("resisted election");
    this.service.getAllActiveElection()
      .subscribe(
        reData => {
          console.log(reData);
          this.activeElection = reData;
        });
  }

  getAllNominatedParty(){
    this.service.getAllNominatedParty()
      .subscribe(
        reData => {
          console.log(reData);
          this.nominatedElection = reData;
        });
  }


}
