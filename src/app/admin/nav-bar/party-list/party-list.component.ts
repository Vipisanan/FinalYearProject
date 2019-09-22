import { Component, OnInit } from '@angular/core';
import {PartyListService} from "./party-list.service";

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {
  private partyList: any;

  constructor(private service:PartyListService) { }

  ngOnInit() {
    this.getPartyList();
  }

  getPartyList(){
    this.service.getPartyList()
      .subscribe(
        reData => {
          console.log(reData);
          this.partyList = reData;
        });
  }

  partyNomination(){
    // this.service.partyNomination()
  }
}
