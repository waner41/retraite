import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Constants from '../constante';

@Component({
  selector: 'app-sam',
  templateUrl: './sam.component.html',
  styleUrls: ['./sam.component.css']
})
export class SamComponent implements OnInit {

  constructor() { 
    this.salaire = 0;
    this.sam = 0;
  }

  salaires = [];

  entreprise:any;
  salaire:number;
  annee:any;
  sam:number;
  isCarriereLongue:boolean;

  ngOnInit() {
  }



  addSalaires(){
    if (this.entreprise != "" && this.salaire != 0 && this.annee != "") {
      let ref = Constants.referencePSS.findIndex( x => x.annee == this.annee);
      if (Constants.referencePSS[ref].pssAnnuelle > this.salaire) {
        this.salaire = this.salaire * Constants.referencePSS[ref].coef;
      } else if (Constants.referencePSS[ref].pssAnnuelle <= this.salaire) {
        this.salaire = (Constants.referencePSS[ref].pssAnnuelle * (Constants.referencePSS[ref].coef));
        
      }
    this.salaires.push({entreprise:this.entreprise,salaire:this.salaire.toFixed(2),annee:this.annee});
    }
  }
  

  calculerSam():number{
    let somme=0;
    this.salaires.sort((a,b)=> b.salaire - a.salaire);

    for(let i =0;i<25;i++){
      somme = somme + parseInt(this.salaires[i].salaire);
    }
    this.sam = somme/25;
    return this.sam;

  }





}
