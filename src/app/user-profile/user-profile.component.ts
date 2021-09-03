import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  id!:String
  newUser:any=[]
  constructor(private router:Router,private userService:UserService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data=>{

      this.newUser = data;

      console.log(this.newUser);
      
    })
  }

  goToProfile(id:String){
    

    this.router.navigate(['main',id])
  }

  onSubmit(){

    this.userService.updateUser(this.newUser,this.id).subscribe(data=>{

       this.goToProfile(this.id);
    })
  }

}
