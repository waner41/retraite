export class User {
    nom: String;
    prenom: String;
    genre: String;
    situation: String;
    age: Date;
    nbrEnfants:number;

    constructor(nom, prenom, age, genre, situation, nbrEnfants){
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.genre = genre;
        this.situation = situation;
        this.nbrEnfants = nbrEnfants;
    }
}
