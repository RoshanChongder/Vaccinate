import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatService } from './stat.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  caseStat : any ;
  showStat : boolean = false ;

  constructor( private statService : StatService , private router : Router ) { 
      this.statService.getStat().subscribe(
        ( response ) => {
          this.caseStat = response ;
          this.showStat = true ;
          // console.log( response , "Country" , response.country , 
          // "Total Cases" , response.cases ,
          // "Today Cases" , response.todayCases , 
          // "Today death" , response.deaths ,
          // "Population" , response.population , 
          // "recovered" , response.recovered ,
          // "Total test" , response.tests ,
          // "recovered" , response.recovered );
        }
      );  
  }

  ngOnInit(): void {
  }

  toLogin(){
    this.router.navigate(['/user/login']);
  }

  toSignup(){
    this.router.navigate(['/user/signup']);
  }

}
