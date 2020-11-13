import { Component, OnInit } from '@angular/core';
import { CalculeService } from '../../service/calcule.service';
import { UserService } from '../../service/user.service';
import { User } from 'src/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pension',
  templateUrl: './pension.component.html',
  styleUrls: ['./pension.component.css']
})
export class PensionComponent implements OnInit {


retraite: Boolean;
veuvage: Boolean;
veuvageOption: boolean;
reversionOption: boolean;

salaire: number;
trimestre: number;
trimestreSupp: number;
user: User;
calculRetraite: boolean;
showPension: boolean;
pensions: any;
ageDeDepart:any;
dateDece: string;


mois1:string;
mois2:string;
mois3:string;
salaireAnnuelBrutReversion:string;
salaireAnnuelBrutConjointReversion:string;
salaireAnnuelBrutEpoux:string;
totalMariageVeuf:string;
totalMariageEpoux:string;
isCouple:boolean
resReversion:string
resVeuvage:string
situation:string;
longue:boolean;
ageLongue16:number;
ageLongue20:number;
hdcp:boolean;
trimestreHandicap:number;
  


  constructor(private calcul: CalculeService, private userService: UserService,private router: Router) { 
    this.retraite = true;
    this.veuvage = false;
    this.veuvageOption = false;
    this.reversionOption = true;
    this.calculRetraite = true;
    this.showPension = false;
    this.situation ="";
    this.ageLongue20 = 0;
    this.ageLongue16 = 0;
    this.longue = false;
    this.hdcp = false;
    this.trimestreHandicap = 0;
    this.isCouple = userService.getUserLocal().situation != "celibataire" ? true : false
  }

  ngOnInit() {
  }

  showLongue(){
    this.longue = true;
    this.hdcp = false;
  }

  showhdcp() {
    this.hdcp = true;
    this.longue = false;
  }

  changeToRetraite(){
    this.veuvage =false; 
    this.retraite = true;
  }

  changeToVeuvage(){
    this.retraite =false; 
    this.veuvage = true;
  }

  valider(){
    if (this.salaire != null && this.trimestre != null && this.trimestreSupp != null) {
      this.user = this.userService.getUserLocal();
        if (this.situation == "handicape" && this.trimestreHandicap != 0) {
          this.pensions = this.calcul.getMaRetraiteHandicape(this.salaire,this.user.age,this.trimestre+this.trimestreSupp,this.trimestreHandicap);
        } else if (this.situation == "longue") {
          debugger;
          let res = this.calcul.getMonDureeReferenteLongue(this.user.age,20,this.ageLongue20,this.trimestre + this.trimestreSupp);
          let res2 = this.calcul.getMonDureeReferenteLongue(this.user.age,16,this.ageLongue16,this.trimestre + this.trimestreSupp);
          if ((res == undefined && res2 == undefined) || (res == 0 && res2 == 0)) {
            alert("Attention vous ne pouvez pas demander une retraite en carrière longue ! Vérifier votre nombre de trimestre(s) cotisé(s) ou trimestre(s) avant vos 20 ans ou vos 16 ans.");
            this.longue == false;
            return "erreur";
          }
          if (this.ageLongue16 != 0) {
            this.pensions = this.calcul.getMaRetraiteLongue(this.salaire,this.user.age,this.trimestre + this.trimestreSupp,this.ageLongue16,16);
          } else if (this.ageLongue20 != 0) {
          this.pensions = this.calcul.getMaRetraiteLongue(this.salaire,this.user.age,this.trimestre + this.trimestreSupp,this.ageLongue20,20);
        }

       } else {

        this.pensions = this.calcul.getMaRetraite(this.salaire, this.user.age, this.trimestreSupp+this.trimestre);
        }
        this.ageDeDepart = this.calcul.getDepartAge(this.user.age,this.situation,this.pensions.age);
        this.trimestre = this.trimestre + this.trimestreSupp;
        this.calculRetraite = false;
        this.showPension = true;
        
      }

    }
  
  validerVeuvage(){
    let age = new Date(this.userService.getUserLocal().age);
    let dateDeceD = new Date(this.dateDece);

    this.resVeuvage = this.calcul.calculeDroitVeuvage(age, dateDeceD, this.userService.getUserLocal().situation+"", parseInt(this.mois1), parseInt(this.mois2), parseInt(this.mois3))
  }

  validerReversion(){

    this.resReversion = this.calcul.calculeDroitReversion(
      parseInt(this.salaireAnnuelBrutReversion),
      parseInt(this.salaireAnnuelBrutConjointReversion),
      parseInt(this.salaireAnnuelBrutEpoux),
      parseInt(this.totalMariageVeuf), 
      parseInt(this.totalMariageEpoux),
      this.isCouple,
      new Date(this.userService.getUserLocal().age)
    )
  }  
  

  onOptionsSelected(event){
    const value = event.target.value;
    console.log(value);

    if(value == "veuvage"){
      this.veuvageOption = true;
      this.reversionOption = false;
    }
    else{
      this.veuvageOption = false;
      this.reversionOption = true;    
    }
  }
    
}   



  

