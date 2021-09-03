import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Intefaces/User';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

 
  
    id!:String
    newUser:any=[]
   
    user!:User[]


  constructor(private router:Router,private userService:UserService,private route:ActivatedRoute,) { 

   

  }



  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.newUser = new User()

    this.userService.getUserById(this.id).subscribe(data=>{

      this.newUser = data;

      
    })

    this.getUser();
 
  }

  getUser(){

    this.userService.getUsers().subscribe(data=>{

      this.user = data;
    })
  }


  edit(id:String){

    this.router.navigate(['userprofile',id])
  }

 

  goToGroup(id:String){

    this.router.navigate(['groups',id])
  }

  gotoInbox(id:String){
    

    this.router.navigate(['inbox',id])

  }

}
