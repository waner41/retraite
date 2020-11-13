import { Injectable } from '@angular/core';
import { User } from 'src/model/user';
import Constants from '../app/constante';
import Rachat from '../app/rachat';

@Injectable({
  providedIn: 'root'
})
export class CalculeService {

  constructor() { }

  situation:string;
  trimestreHandicape;
  trimestreTravaille;


  isTrimestreValid(mois1:number, mois2:number, mois3:number){
    let valeurReference = Constants.SMIC * 150;
    let ret = "";
    if(mois1+mois2 >= Constants.PSS*2 || mois2+mois3 >= Constants.PSS*2){
      ret = "Vous avez validez 4 trimestres";
    }
    else if(valeurReference < (mois1 + mois2 + mois3)){
      ret = "validé"
    }
    else{
      ret = "non validé"

    }

    return ret;
  }


  calculeDroitVeuvage(dateNaissance:Date, dateDécé:Date, situation:string, mois1:number, mois2:number, mois3:number){
      let age = this.getAgeAnnée(dateNaissance);
      let dateDiff = this.getAgeAnnée(dateDécé);
      let ret = "";

      let tot = mois1 + mois2 + mois3;

      if(tot > 2335.58){
        return "Vous avez dépassé le montant plafond de 2335.58 €"
      }

      if(dateDiff >= 2 || age > 55 || situation != "celibataire"){
        ret = "Vous ne respectez pas les conditions pour bénéficier des allocations veuvage : "
        if(dateDiff >= 2){
          ret += "Votre demande a dépassé les 2 ans légales"
        }
        if(age > 55){
          ret += "Vous avez plus de 55 ans"
        }
        if(situation != "celibataire"){
          ret += "Votre situation ne vous le permet pas : " + situation; 
        }

      }
      else{
        ret = "Vous bénéficiez de l'allocation veuvage d'un montant de 622,82 € net par mois"
      }
      return ret;
    }


  infoPeriodeNonTravaille(maladie:boolean, invalitite:boolean, chomageNt:boolean, serviceMilitaire:boolean, RSA:boolean){
    let ret = new Array();

      if(maladie){
        ret.push("Maladie : Pour une période de maladie de 60 jours, vous pouvez bénéficier de 1 trimestre")

      }
      
      if(invalitite){
        ret.push("Invalidité : Si vous avez eu 3 versements au cours d'un trimestre, vous avez le droit à 1 trimestre")

      }
      
      if(chomageNt){
        ret.push("Chomage : Si vous avez eu 50 jours d'indémnisation, vous avez le droit à 1 trimestre")
        
      }

        
      if(serviceMilitaire){
        ret.push("Service militaire : Si vous avez effectué 90 jours de service militaire, vous avez le droit à 1 trimestre")

      }

    return ret;
  }

  infoTrimesttresSup(value:string){
    let res = "";
    switch(value){
      case "maladie":
        res = "Pour une période de maladie de 60 jours, vous pouvez bénéficier de 1 trimestre"
      break;
      case "invalitite":
        res = "Si vous avez eu 3 versements au cours d'un trimestre, vous avez le droit à 1 trimestre"
      break;
      case "chomage":
        res = "Si vous avez eu 50 jours d'indémnisation, vous avez le droit à 1 trimestre"

        break;
      case "serviceMilitaire":
        res = "Si vous avez effectué 90 jours de service militaire, vous avez le droit à 1 trimestre"

        break;
      case "RSA":
        res = "Vous n'avez pas cotisé de trimestre"

        break;
              
    }

    return res;
  }

  getSecurityKeyByNir(nir:number):number{
    return  (97 - (nir%97));
  }

  SemestreValide(heureTravailléParMois:number,salaire:number):boolean{
    return true;
}


  CalculeTrimestreArret(option:string,jours:number):boolean{

    let valider:boolean=false;

    switch (option) {
            case 'Maladie':
              if (jours >= 60)
                valider = true
            case 'Invalidite':
              if (jours >= 90)
                valider = true
            case 'Chomage':
              if (jours >= 50)
                valider = true
            case 'Service':
              if (jours >= 90)
                valider = true
    }

    return valider;
  }

  getMonAnneeReferente(dateNaissance:Date){
    let monAnneeReferente;
    Constants.TrimestreReference.forEach(element => {

       if (element.annee.indexOf(dateNaissance.getFullYear()) > -1) {
          monAnneeReferente = element;
       }
    });
    if (monAnneeReferente == undefined){
    monAnneeReferente = Constants.TrimestreReference[9];
    }
    return monAnneeReferente;
  }

  getMonAnneeReferenteHandicape(dateNaissance:Date){
    let monAnneeReferente;
    Constants.TrimestreHandicap.forEach(element => {

       if (element.annee.indexOf(dateNaissance.getFullYear()) > -1) {
          monAnneeReferente = element;
       }
    });
    if (monAnneeReferente == undefined){
    monAnneeReferente = Constants.TrimestreReference[9];
    }
    return monAnneeReferente;
  }

  getMonAnneeReferenteLongue(dateNaissance:Date){
    let monAnneeReferente;
    Constants.TrimestreLongues.forEach(element => {

       if (element.annee.indexOf(dateNaissance.getFullYear()) > -1) {
          monAnneeReferente = element;
       }
    });
    if (monAnneeReferente == undefined){
    monAnneeReferente = Constants.TrimestreReference[9];
    }
    return monAnneeReferente;
  }

  getTrimestreHandicape(dateNaissance:Date){
  var timeDiff = Math.abs(Date.now() - new Date(dateNaissance).getTime());
   let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    let trimestre;
    Constants.TrimestreHandicap.forEach(element => {
      if (element.annee.indexOf(dateNaissance.getFullYear()) > -1) {
       element.ageDepart.forEach(b => {

        if (b.age == age) {
          trimestre = b.trimestre;
       }
       });
      }
    });
    return trimestre;
  }

  getMonTaux(dateNaissance:Date,trimestreCotise:number,anneeDepart:Date):number{
   let monAnneeReferente = this.getMonAnneeReferente(dateNaissance);
   var timeDiff = Math.abs(new Date(anneeDepart).getTime() - new Date(dateNaissance).getTime());
   let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  
   if (age < monAnneeReferente.ageTauxPlein) {
     //Malus
    let trimestreManquant1 = (monAnneeReferente.ageTauxPlein - age) * 4;
    var CasTaux1 = 50 - ( trimestreManquant1 * 0.625);

    let trimestreManquant2 = (monAnneeReferente.trimestre - trimestreCotise);
    var CasTaux2 = 50 - (0.625 * trimestreManquant2);

    if (CasTaux2 < CasTaux1) {
      return CasTaux1;
    } else {
      return CasTaux2;
    }

   }
   
   if (age >= monAnneeReferente.ageTauxPlein || CasTaux1 > 50 || CasTaux2 > 50) {
    //Normal
    return 50;
   }

  }

  getMaSurcote(dateNaissance:Date,trimestreSupp:number,pensionParMois:number):number {
    let monAnneeReferente = this.getMonAnneeReferente(dateNaissance);
    var timeDiff = Math.abs(Date.now() - new Date(dateNaissance).getTime());
    let age = timeDiff / (1000 * 3600 * 24) / 365.25;

    let taux = trimestreSupp * 1.25/100;
    return pensionParMois * taux; 
  }

  getDepartAge(dateNaissance:Date,situation:string,legal:number){
  let dateTmp:Date;
  dateTmp = new Date(Date.now());
  let monAnneeReferente = this.getMonAnneeReferente(dateNaissance);
  var timeDiff = Math.abs(Date.now() - new Date(dateNaissance).getTime());
  let age = timeDiff / (1000 * 3600 * 24) / 365.25;
  let agelegal = monAnneeReferente.ageLegal;

  if (situation == "handicape") {

    var refH = this.getMonAnneeReferenteHandicape(dateNaissance);

    var d = refH.ageDepart.findIndex(element => element.assur <= this.trimestreTravaille  && element.trimestre <= this.trimestreHandicape);
    agelegal = refH.ageDepart[d].age;
  } else if (situation == "longue") {
    agelegal = legal;
  }
  
  let nbrAnneeRestante = agelegal - age;
  dateNaissance.setFullYear(dateTmp.getFullYear()+nbrAnneeRestante);
  var tmp = dateNaissance.getTime() - Date.now();
  var nbrJours = Math.floor(tmp / (1000 * 60 * 60 * 24));
    
  var annee = nbrJours/365.25;
  var mois = (annee-Math.floor(annee))*12;
  var jours = (mois-Math.floor(mois))*30;

  if (annee <= 0) {
    annee = 0;
  }
  
  let resultat = {
    'annee' : (Math.floor(annee)),
    'mois' : (Math.floor(mois)),
    'jours': Math.ceil(jours),
    'ageLegal': agelegal,
    'age': age
}
  return resultat;
  }


  getMaRetraite(sam:number,dateNaissance:Date,trimestreTravaille:number){
    let taux:number;

    if (trimestreTravaille >= this.getMonAnneeReferente(dateNaissance).trimestre) {
       taux = this.getMonTaux(dateNaissance,this.getMonAnneeReferente(dateNaissance).trimestre,new Date(Date.now()));
    } else {
     taux = this.getMonTaux(dateNaissance,trimestreTravaille,new Date(Date.now()));
    }

    if (this.situation == "handicap") {
      taux = 50;
    }

    var tmp = trimestreTravaille/this.getMonAnneeReferente(dateNaissance).trimestre;
    var pension = sam * (taux/100) * tmp;

    if (this.getMonAnneeReferente(dateNaissance).trimestre < trimestreTravaille) {
      pension = this.getMaSurcote(dateNaissance,trimestreTravaille-this.getMonAnneeReferente(dateNaissance).trimestre,pension) + pension;
    }

    let pensions = {
      'pension':pension,
      'taux':taux,
    }

    return pensions;
  }

  getAgeAnnée(dateNaissance:Date){
    var timeDiff = Math.abs(Date.now() - new Date(dateNaissance).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

    return age;
  }
  
  
  calculeDroitReversion(salaireAnnuelBrutReversion:number, salaireAnnuelBrutConjointReversion:number, salaireAnnuelBrutEpoux:number, totalMariageVeuf:number, totalMariageEpoux:number, isCouple:boolean, age:Date){
    let res = salaireAnnuelBrutEpoux*0.54*(totalMariageVeuf/totalMariageEpoux);
    let calculTot;

    let age1 = this.getAgeAnnée(age);


    if (age1 < 55) {
      return "Vous devez avoir plus de 55 ans";
    }
    if(isCouple){
      let tot = salaireAnnuelBrutReversion + salaireAnnuelBrutConjointReversion;
      if(tot > 33779.20){
        console.log(tot)
        return "Le salaire du couple dépasse le montant de 33779.20€"
      }
      
      if(res+salaireAnnuelBrutReversion+salaireAnnuelBrutConjointReversion > 33779.20){
        calculTot = res+tot-33779.20;
      }
      else{
        calculTot = res;
        calculTot = res - calculTot;
      }

      if(calculTot>11106.72){
        calculTot = 11106.72;
      }
      return "Vous pouvez bénéficier d'une allocation de réversion de : "+Number.parseFloat(calculTot).toFixed(2)+" €"
    }

    else{
      if(salaireAnnuelBrutReversion > 21112){
        return "Le salaires dépasse le montant de 21112.00€"
      }
      if(res+salaireAnnuelBrutReversion > 21112){
        calculTot = salaireAnnuelBrutReversion+res - 21112;
        calculTot = res - calculTot;
      }
      else{
        calculTot = res;
      }

      if(calculTot>11106.72){
        calculTot = 11106.72;
      }
      return "Vous pouvez bénéficier d'une allocation de réversion de : "+Number.parseFloat(calculTot).toFixed(2)+" €"
    }
  }

  calculRachat(salaire:number, choix:string, age:Date){
    console.log("calcul rachat")
    let agePersonne = this.getAgeAnnée(age);
    let tab;
    let tranche;
    Rachat.ageStep.forEach((val) => {
      if(agePersonne >= val){
        tranche = val;
      }
    })
    let colonne;
    if(choix == "seul"){
      tab = Rachat.seul;
    }
    else{
      tab = Rachat.assurance;
    }

    if(salaire<30852){
      colonne = "inf";
    }
    else if(salaire>41136){
      colonne = "sup";
    }
    else{
      colonne = "pourcent";
    }

    if(colonne == "pourcent"){
      return salaire*(tab[tranche][colonne]/100);
    }
    else{
      return tab[tranche][colonne]
    }
  }

  calculTrimstreSup(user:User, enfant:boolean, enfantH:boolean, chomage:boolean, education:boolean){
    
    let ret = new Array();
    let femme = false;
    if(user.genre == "femme"){
      femme = true;
    }

    if(enfant){
      if(femme){
        ret.push("Enfants nés, élevés : Les enfants nés avant 2010 vous donnent droit à 8T/enfants, après 2010 les trimestres peuvent être partagés avec le père de l'enfant.");
      }
      else{
        ret.push("Enfant nés, élevés : Vous pouvez avoir cotisé jusqu'a 4T/enfants nés après 2010 si la demande a été faite.")
      }
    }
    if(enfantH){
      ret.push("Enfant(s) handicapé(s) : Des trimestres supplémentaires, dans la limite de 7, vous sont ensuite accordés à la fin de chaque période de 30 mois civils de versement de l'AEEH.")
    }
    if(chomage){
      ret.push("Chomage : Vous avez cotisez 1T tous les 50 jours de chomages dans la limite de 4T/an.")
    }
    if(education){
      ret.push("Congés parentaux d'éducation : Un trimestre est validé à la fin de chaque période de 90 jours et le nombre de trimestres est arrondi au chiffre supérieur.")
    }
   
    return ret;
  }
  getMaRetraiteHandicape(sam:number,dateNaissance:Date,trimestreTravaille:number,trimestreHandicap:number){

    this.situation = "handicap";
    this.trimestreHandicape = trimestreHandicap;
    this.trimestreTravaille = trimestreTravaille;
    let maRetraite = this.getMaRetraite(sam,dateNaissance,trimestreTravaille);

    if (this.getMonAnneeReferente(dateNaissance).trimestre >= trimestreTravaille) {


      var majoration = (trimestreHandicap / trimestreTravaille) / 3;
      var pension = maRetraite.pension * (1+majoration);

    }


    let pensions = {
      'pension':pension,
      'taux':50,
      'handicape':true
    }

    return pensions;
  }
   getMonDureeReferenteLongue(dateNaissance:Date,trimestreAge:number,trimestreAvant:number,trimestreTravaille:number){

    let trimestreRequis;

    if (trimestreAvant >= 5) {

    trimestreRequis = 5;

    }else if (dateNaissance.getMonth()>= 10 && trimestreAvant == 4) {
      trimestreRequis = 4;
    } else {
      return 0;
    }

    var timeDiff = Math.abs(Date.now() - new Date(dateNaissance).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    let trimestre;

    let monAnneeReferente = this.getMonAnneeReferenteLongue(dateNaissance);
  
    monAnneeReferente.departPossible.forEach(b => {
        if (b.avant == trimestreAge && b.trimestre <= trimestreTravaille) {
          trimestre = {trimestre: b.trimestre,age: b.age} 
        }
      });

    return trimestre;
  }

  getMaRetraiteLongue(sam:number,dateNaissance:Date,trimestreTravaille:number,trimestreAvant,trimestreAge){

    var tmp = trimestreTravaille/this.getMonDureeReferenteLongue(dateNaissance,trimestreAge,trimestreAvant,trimestreTravaille).trimestre;
    var pension = sam * (50/100) * tmp;

    let pensions = {
      'pension':pension,
      'taux':50,
      'age':this.getMonDureeReferenteLongue(dateNaissance,trimestreAge,trimestreAvant,trimestreTravaille).age
    }
    return pensions;
  }
}
