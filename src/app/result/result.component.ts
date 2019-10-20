import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
declare function openChart() : any;
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    var chart = c3.generate({
      data: {
        // iris data from R
        columns: [
          ['data1', 30],
          ['data2', 120],
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      }
    });

    setTimeout(function () {
      chart.load({
        columns: [
          ["setosa", 20 , 10],
          ["versicolor", 30],
          ["virginica", 20],
          ["test", 8],
        ]
      });
    }, 1500);

    setTimeout(function () {
      chart.unload({
        ids: 'data1'
      });
      chart.unload({
        ids: 'data2'
      });
    }, 2500);

  }

  //not working
  chart(){
    let chart2 = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }


}
