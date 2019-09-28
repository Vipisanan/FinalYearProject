import { Component, OnInit } from '@angular/core';
import {AddElectionService} from "./add-election.service";
import {typeIsOrHasBaseType} from "tslint/lib/language/typeUtils";


@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.css']
})
export class AddElectionComponent implements OnInit {
  private electionList: any;
  private registeredElection: any;
  private election:any;
  public id:number;

  constructor(private service:AddElectionService) { }

  ngOnInit() {
    this.getAllTypesOfElection();
    this.getRegisteredElection();
  }

  getAllTypesOfElection(){
    this.service.getAllTypesOfElection()
      .subscribe(
      reData => {
        console.log(reData);
        this.electionList = reData;
      });
  }
  getRegisteredElection(){
    this.service.getRegisteredElection()
      .subscribe(
        reData => {
          console.log(reData);
          this.registeredElection = reData;
        });
  }

  registerElection(id) {
    console.log("confirm register election" , id);
    this.service.registerElection(id)
      .subscribe(
        reData => {
          console.log(reData);
          if (reData.statusDescription == "Success") {
            alert(reData.statusDescription + "Successfully permission denied")
          }else {
            alert(reData.statusDescription + "try again");
            // alert("")
          }
        });
  }
  getActiveId(id){
    this.id = id;
    console.log(this.id);
  }

  activeElection() {
    this.service.activeElection(this.id)
      .subscribe(
        reData => {
          console.log(reData);
          if (reData.statusDescription == "Success") {
            alert(reData.statusDescription + "Successfully Activated")
          }else {
            alert(reData.statusDescription);
            // alert("")
          }
        });
console.log(this.id);
  }
  deActiveElection(){

    this.service.deActiveElection(this.id)
      .subscribe(
        reData => {
          console.log(reData);
          if (reData.statusDescription == "Success") {
            alert(reData.statusDescription + "Successfully Deactivated")
          }else {
            alert(reData.statusDescription);
          }
        });
  }

  getElection(election: any) {
    console.log(election);
    this.election=election;
  }
}
