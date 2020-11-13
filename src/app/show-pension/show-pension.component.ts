import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-show-pension',
  templateUrl: './show-pension.component.html',
  styleUrls: ['./show-pension.component.css']
})
export class ShowPensionComponent implements OnInit {

  @Input() retraite; 
  @Input() ageDeDepart;
  @Input() trimestre;

  prevision:boolean;
  user:User;
  aspaBool:boolean;
  aspa:number;



  constructor(private userService:UserService) {
    this.prevision = false;
    this.aspaBool = false;
    this.user = userService.getUserLocal();
   }

  ngOnInit() {

    if (this.user.nbrEnfants >= 3) {
      this.retraite.pension = this.retraite.pension * 110/100;
    }
    
    if (this.ageDeDepart['age'] < this.ageDeDepart['ageLegal']){
      this.prevision = true;
    }
    
    if (this.retraite.pension/12 < 903.20  && this.user.situation == "celibataire") {
        this.aspa = 903.20 - this.retraite.pension/12;
        this.aspaBool = true
    } else if ((this.user.situation == "marie" || this.user.situation == "pacse")) {
        this.aspaBool = true;
    }
  }
}
