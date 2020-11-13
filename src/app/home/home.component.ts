import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { UserService } from 'src/service/user.service';
import { CalculeService } from '../../service/calcule.service';
import Constants from '../constante';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  nom: String;
  prenom: String;
  genre: String;
  situation: String;
  age: Date;
  isInfoValid: Boolean;
  nbrEnfants: number;
  user: User;

  constructor(public serviceCalcule:CalculeService, private router: Router, private userS:UserService) {

    this.user = userS.getUserLocal();
    if(this.user != null){
      this.nom = this.user.nom;
      this.prenom = this.user.prenom;
      this.genre = this.user.genre;
      this.situation = this.user.situation;
      this.nbrEnfants = this.user.nbrEnfants;
      this.age = this.user.age;
      this.isInfoValid = true;
  
    }
    else{
      this.nom = "";
      this.prenom = "";
      this.genre = "femme";
      this.situation = "celibataire";
      this.isInfoValid = null;
    }


   }

  ngOnInit() {
    let mydate = new Date()
    mydate.setFullYear(1957)
    console.log(Constants.TrimestreReference[0].ageTauxPlein);
    this.serviceCalcule.getMonAnneeReferente(mydate)
  }


  //check form values
  //Put user on localStorage
  userInfoValid(){
    if(this.nom != "" && this.prenom != "" && typeof(this.age) != "undefined"){
      this.age = new Date(this.age);
      this.user = new User(this.nom, this.prenom, this.age, this.genre, this.situation, this.nbrEnfants)
      this.userS.addUserLocal(this.user);
      this.isInfoValid = true;  
    }
    else{
      this.isInfoValid = false;
    }
  }

  //route
  goToPension(){
    if(this.isInfoValid){
      this.router.navigate(['pension'])
    }
  }

  //route
  goToTrimestre(){
    if(this.isInfoValid){
      this.router.navigate(['trimestre'])
    }    
  }

}
