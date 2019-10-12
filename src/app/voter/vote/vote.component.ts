import {Component, OnInit} from '@angular/core';
import {VotingListService} from "./voting-list.service";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  votingList: any;

  constructor(private service: VotingListService) {
  }

  ngOnInit() {
    this.getList();
    console.log("ssssssssssssssss0");
  }

  public getList() {
    this.service.getVotingList()
      .subscribe(
        reData => {
          this.votingList = reData;
          console.log(reData);
        });
  }
}
