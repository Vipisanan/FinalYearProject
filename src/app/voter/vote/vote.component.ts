import {Component, OnInit} from '@angular/core';
import {VotingListService} from "./voting-list.service";
import {MatDialog} from '@angular/material';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  votingList: any;
  private counter: number=0;
  private answers: any;
  private createMode: boolean;
  private updateMode: boolean;
  voterId: string;
  question: any;
  check: any = false;

  nominatedPartyId: Array<String> = [];
  nominatedCandidateId: Array<number> = [];


  constructor(private service: VotingListService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getList();
    this.openDialog();
  }

  public getList() {
    this.service.getVotingList()
      .subscribe(
        reData => {
          this.votingList = reData;
          console.log(reData);
        });
  }

  onVote() {
    console.log('nominatedCandidateId is ' + this.nominatedCandidateId);
    console.log("nominatedPartyId is ", this.nominatedPartyId);
    console.log("voterId is ", localStorage.getItem('voterId'));
    this.voterId = localStorage.getItem('voterId');
    this.service.addVote(this.nominatedCandidateId, this.nominatedPartyId, this.voterId)
      .subscribe(
      reData => {
        console.log(reData);
        window.location.reload();
        this.nominatedPartyId.splice(0, this.nominatedPartyId.length);
        this.snackBar.open("Successfully you'r voted");
        localStorage.removeItem("voterId");
        if (localStorage.getItem("voterId") === null){
          this.openDialog();
        }
      });

  }

  checked(checkBox) {
    this.check = true;
    let index = checkBox.name;
    console.log('Index from checked() --> {}', index);
    if(this.answers[index] != "" && this.createMode){
      return true;
    }
    //For Example it will always pass through here updateMode = true
    if(this.answers[index] != "" && this.updateMode ){
      return true;
    }
  }

  checkedState(event, nominatedPartyId, nominatedCandidateId) {
    let index: number = event.target.name;
    console.log('Index is ' + index);
    if(event.target.checked === true){
      if (this.counter < 2) {
        //TODO here add the candidate id
        this.nominatedPartyId.push(nominatedPartyId);
        this.nominatedCandidateId.push(nominatedCandidateId);
        this.counter++;
      }else{
        event.target.checked = false;
      }
    }else if(this.counter>0){
      //TODO here remove the candidate id
      for (var i = 0; i < this.nominatedPartyId.length; i++) {
        if (this.nominatedPartyId[i] === nominatedPartyId) {
          this.nominatedPartyId.splice(i, 1);
        }

      }
      for (var i = 0; i < this.nominatedCandidateId.length; i++) {
        if (this.nominatedCandidateId[i] === nominatedCandidateId) {
          this.nominatedCandidateId.splice(i, 1);
        }
      }
      console.log("checkBox.checked is IF IT'S FALSE", event.target.checked);
      this.counter--;
    }

  }


  openDialog() {
    this.dialog.open(FingerPrintLogin, {});
  }

}


//popUp
@Component({
  selector: 'login-popup',
  templateUrl: 'fingerPrint-Auth-popup.html',
})
export class FingerPrintLogin {
  public fingerPrint: String;
  public voterId: String;
  public isVoter: String[];

  constructor(private service: VotingListService,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<FingerPrintLogin>) {

    dialogRef.disableClose = true;
    localStorage.removeItem('voterId');

  }

  getFingerPrint(event: any) {
    // console.log(event.target[0].fingerPrint);
    this.fingerPrint = event.target.value;
    this.checkFingerPrint(this.fingerPrint);

  }

  checkFingerPrint(fingerPrint: String) {
    this.service.checkFingerPrint(fingerPrint)
      .subscribe(
        reData => {
          this.voterId = reData;
          localStorage.setItem('voterId', reData);
          this.isVoter = this.voterId.split('-', 3);
          if (this.isVoter[0] === 'VOTER') {
            this.dialog.closeAll();
          }
          if (this.isVoter[0] === 'NO_USER_FOUND') {
            alert("Finger print Not match!")
          }
          console.log(reData);
        });
  }
}
