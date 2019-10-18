import {Component, OnInit} from '@angular/core';
import {VotingListService} from "./voting-list.service";
import {MatDialog} from '@angular/material';

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

  onVote(id: any) {
    console.log(id);
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
  checkedState(event){
    let index: number = event.target.name;
    console.log('Index is ' + index);
    console.log('checkBox.checked is ' ,event.target.checked );
    if(event.target.checked === true){
      console.log('checkBox.checked is IF IT"S TRUE ' ,event.target.checked );
      if(this.counter < 1){
        this.counter++
      }else{
        event.target.checked = false;
      }
    }else if(this.counter>0){
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

  constructor(private service: VotingListService, public dialog: MatDialog) {
  }

  getFingerPrint($event: Event) {
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
