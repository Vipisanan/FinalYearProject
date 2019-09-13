import { Component, OnInit } from '@angular/core';
import {VoterList} from "../../models/VoterList";
import {VoterListService} from "../voter-list/voter-list.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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
  getUserId(id: number) {
    this.userId =id;
    this.getUserById();
  }


  getUserById(){
    this.service.getUserById(this.userId)
      .subscribe(
        reData => {
          console.log(reData);
          this.user = reData;
          this.isUser=true;
        });
  }



  giveVoterPermission(id:number) {
    console.log(id);
    this.service.giveVoterPermission(id)
      .subscribe(
        reData => {
          console.log(reData);
          if (reData.statusDescription == "Success") {
            alert(reData.statusDescription + "Successfully permission denied")
          }else {
            // alert(reData.statusDescription + "try again");
            alert("He/She is already voter")
          }
        });
  }

}
