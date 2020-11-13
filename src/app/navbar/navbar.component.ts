import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from 'src/service/user.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user:User;

  homeIcon:any;
  constructor(public userS:UserService, private router:Router) { 
    this.homeIcon = faHome;

    this.user = userS.getUserLocal();
    
  }

  ngOnInit() {

  }

  changeUser(){
    this.userS.reset();
    this.user=null
    this.router.navigate([''])
  }
}
