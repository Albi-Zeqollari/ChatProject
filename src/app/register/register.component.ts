import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../Intefaces/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  user:User = new User();
  constructor(private userService:UserService,private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }


  saveUser(){

    this.userService.createUser(this.user).subscribe(data=>{

      console.log(data);
      this.goToLogin(); 
      this.openSnackbar();

    },error=>this.errorSnackBar());
  }

  onSubmit(){


  
    this.saveUser();
  
  console.log(this.user);

     
    
  }


  goToLogin(){

    this.router.navigate(['login'])
  }

  openSnackbar(){

    this.snackBar.open("Succesfully registered","Dissmis")
  }

  errorSnackBar(){

    this.snackBar.open("Pleas fill the form","Dismiss")
  }

}
