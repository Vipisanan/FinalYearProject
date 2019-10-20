import {Component, OnInit} from '@angular/core';
import {VotingListService} from "./voting-list.service";
import {MatDialog} from '@angular/material';
import {MatDialogRef} from "@angular/material/dialog";

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
  candidateId: Array<number> = [];
  question: any;
  check: any = false;


  constructor(private service: VotingListService,
              public dialog: MatDialog) {
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
    console.log('candidateId is ' + this.candidateId);
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

  checkedState(event, candidateId) {
    let index: number = event.target.name;
    console.log('Index is ' + index);
    // console.log('checkBox.checked is ' ,event.target.checked );
    if(event.target.checked === true){
      if (this.counter < 1) {
        //TODO here add the candidate id
        this.candidateId.push(candidateId);
        console.log('candidateId is ' + this.candidateId);
        this.counter++;
      }else{
        event.target.checked = false;
      }
    }else if(this.counter>0){
      //TODO here remove the candidate id
      for ( var i = 0; i < this.candidateId.length; i++){
        if (this.candidateId[i] === candidateId){
          this.candidateId.splice(i, 1);
        }
      }
      console.log('candidateId is ' + this.candidateId);
      console.log('checkBox.checked is IF IT"S FALSE ' ,event.target.checked );
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
