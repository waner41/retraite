import { Component, OnInit } from '@angular/core';
import { CalculeService } from 'src/service/calcule.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-trimestre',
  templateUrl: './trimestre.component.html',
  styleUrls: ['./trimestre.component.css']
})

export class TrimestreComponent implements OnInit {

  trimestNav: Boolean;
  nonTravailerNav: Boolean;
  rachatDeTrimestreNav: Boolean;
  TrimestreSupNav: Boolean;

  mois1: string;
  mois2: string;
  mois3: string;
  resultTrimestre: string;

  maladie: boolean;
  invalitite: boolean;
  chomageNt: boolean;
  serviceMilitaire: boolean;
  RSA: boolean;

  situation2: string;
  infoTrimestreSup: Array<string>;
  infoNonTravaille: Array<string>;

  enfantsEleves:boolean;
  enfantsHandicapes:boolean;
  chomage:boolean;
  education:boolean;

  typeRachat:string;
  salaire:number;
  coutRachat:number;

  constructor(private calculService: CalculeService, private userS:UserService) { 
    this.trimestNav = true;
    this.typeRachat = "seul"

  }

  ngOnInit() {
  }

  changeNav(navChoice){
    this.trimestNav = false;
    this.nonTravailerNav = false;
    this.rachatDeTrimestreNav = false;
    this.TrimestreSupNav = false;

    switch (navChoice){
      case "trimestNav":
        this.trimestNav = true;
        break
      case "nonTravailerNav":
        this.nonTravailerNav = true;
        break;
      case "rachatDeTrimestreNav":
        this.rachatDeTrimestreNav = true;
        break;
      case "TrimestreSupNav":
        this.TrimestreSupNav = true;
        break;
    }
  }

  calculTrimestreValid(){
    this.resultTrimestre = this.calculService.isTrimestreValid(parseInt(this.mois1), parseInt(this.mois2), parseInt(this.mois3))
  }

  nonTravailleInfo(){
    this.infoNonTravaille = this.calculService.infoPeriodeNonTravaille(this.maladie, this.invalitite, this.chomageNt, this.serviceMilitaire, this.RSA);
  }

  trimestreSupInfo(){
    this.infoTrimestreSup = this.calculService.calculTrimstreSup(this.userS.getUserLocal(), this.enfantsEleves, this.enfantsHandicapes, this.chomage, this.education);
  }

  calculRachat(){
    let choix = "";
    console.log(this.typeRachat);
    if(this.typeRachat == "seul"){
      choix = "seul"; 
    }
    else{
      choix="assurance"
    }

    this.coutRachat = this.calculService.calculRachat(this.salaire, choix, this.userS.getUserLocal().age)
  }

}
