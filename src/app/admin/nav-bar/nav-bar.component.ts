import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  logOut() {
    localStorage.removeItem('isLogin');
    console.log(localStorage.getItem('isLogin'));
    window.location.reload();
  }
}
