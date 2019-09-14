import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VoterListService} from "./voter-list.service";
import {VoterList} from "../../models/VoterList";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {assertNumber} from "@angular/core/src/render3/assert";

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-voter-list',
  templateUrl: './voter-list.component.html',
  styleUrls: ['./voter-list.component.css']
})

export class VoterListComponent implements OnInit {

  voterList: VoterList[];
  user: any;
  isUser=false;
  userId:number;
  isAdded: boolean;

  constructor(private service:VoterListService) { }

  ngOnInit() {
    this.getVoterList();
  }

  getVoterList(){
    this.service.getVoterList()
      .subscribe(
        reData => {
          console.log(reData);
          this.voterList = reData;
        });
  }

}
