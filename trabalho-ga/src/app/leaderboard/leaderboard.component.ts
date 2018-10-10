import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderboard : any[] = [];
  constructor(private http : HttpClient) {
    this.http.get('score').subscribe((data : any) =>{ 
      this.leaderboard = data.data;
      console.log(data);

      this.leaderboard.sort((a, b) : any => {
         return b.score - a.score;
       });
    },(error : any) => console.log(error));
  }

  ngOnInit() {
  }

}

