import { Component, OnInit } from '@angular/core';
import { CalculeService } from 'src/service/calcule.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  secu: Boolean;
  sam: Boolean;
  pension: Boolean;
  secuKey: String[];
  result: String;
  dateVersement: string;
  nextDateVersement: Date;

  constructor(private calcul: CalculeService) { 
    this.secu = true;
    this.pension = false;
    this.sam = false;
    this.secuKey = new Array();
    this.result = ""
  }


  changeToPension(){
    this.secu =false; 
    this.sam = false;
    this.pension = true;
  }

  changeToSecu(){
    this.pension =false; 
    this.sam = false;
    this.secu = true;
  }

  changeToSam(){
    this.pension = false;
    this.secu = false;
    this.sam = true;
  }

  valider(){
    let nbKey = "";
    this.secuKey.forEach(nb => {

      nbKey += nb;

    })

    
    let nir = this.calcul.getSecurityKeyByNir(parseInt(nbKey))
    
    this.result = nir+"";
  }

  resest(){
    this.secuKey.forEach((el, nb) => {
        this.secuKey[nb] = ""
    });
    this.result = "";
  }

  calculeDateVersement(){
    this.nextDateVersement = new Date(Date.parse(this.dateVersement));
    this.nextDateVersement.setMonth(this.nextDateVersement.getMonth() + 1);
    this.nextDateVersement.setDate(1)
    
  }

  ngOnInit() {
  }

}
