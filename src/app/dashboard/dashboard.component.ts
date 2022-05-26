import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users
  movies

  constructor( private dashBoard :  ApiService    ) { }

  ngOnInit(): void {
    this.dashboardContent();
  }

  dashboardContent(){
    this.dashBoard.dashboard().subscribe(
      data =>{
        // console.log(data.data);

        this.users = data.data.total_user
        this.movies = data.data.total_movies
      }
    )
  }


}
