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

  dropElection(id) {
console.log(id);
  }

  getElection(election: any) {
    console.log(election);
    this.election=election;
  }
}
