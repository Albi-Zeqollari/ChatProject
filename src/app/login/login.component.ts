import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { User } from '../Intefaces/User';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  userid!:String
  users!:User[];
  user:any={}
  newUser!:User
  constructor(private router:Router,private userService:UserService,private route:ActivatedRoute,private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.getUsers();
  }


  private getUsers(){

    this.userService.getUsers().subscribe(data=>{

      this.users = data;
      console.log(this.users);
      
    })
  }


  logIn(){


    this.userService.LoginUser(this.user).subscribe(data=>{

      this.user = data;

      this.router.navigate(["/main/" + this.user.id])
      this.openSnackbar();
      
    },error=>this.errorSnackBar())
    
  }

  onSubmit(){

 
    console.log(this.user);
    this.logIn();

  }
  
  openSnackbar(){

    this.snackBar.open("Succesfully logged in ","Dissmiss")
  }

  errorSnackBar(){

    this.snackBar.open("Wrong email or password / Please fill the form correctly","Dissmiss")
  }

}
