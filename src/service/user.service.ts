import { Injectable } from '@angular/core';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})

//User localStorage add/get
export class UserService {

  user: User;
  constructor() { }


  addUserLocal(user: User){
    localStorage.setItem("user",  JSON.stringify(user));
  }

  getUserLocal():User{

    if(localStorage.getItem("user") != null){
      this.user = JSON.parse(localStorage.getItem("user"));
      this.user.age = new Date(this.user.age);
    }
    else{
      this.user = null;
    }
    return this.user;
  }

  reset(){
    localStorage.removeItem("user");
  }
}
