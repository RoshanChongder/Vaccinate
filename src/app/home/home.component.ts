import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatService } from './stat.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  caseStat: any ;
  showStat: boolean = false ;

  constructor( private statService: StatService , private router: Router) { 
      this.statService.getStat().subscribe(
        ( response ) => {
          this.caseStat = response ;
          this.showStat = true ;
        }
      );  
  }

  ngOnInit(): void {}

  toLogin(){
    this.router.navigate(['/user/login']);
  }

  toSignup(){
    this.router.navigate(['/user/signup']);
  }

}
