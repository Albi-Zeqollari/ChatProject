import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoom } from '../Intefaces/ChatRoom';
import { User } from '../Intefaces/User';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {


  id!:String
  chat:ChatRoom=new ChatRoom
  users:any=[]
  newUser!:User;
  chats:ChatRoom[]=[]
  chatt!:any
  constructor(private chatRoomServ:ChatService,private userService:UserService,private router:Router,private route:ActivatedRoute,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    

    this.id= this.route.snapshot.params['id']

    this.chatRoomServ.getChatById(this.id).subscribe(data=>{

      this.chat =data;
      console.log(data);
      
    })

    this.getUsers();

  }

  getUsers(){

    this.userService.getUsers().subscribe(data=>{

      this.users = data;
    })
  }

  
  compareObjects(o1: any, o2: any): boolean {
    return  o1.id === o2.id;
  }

  onSubmit(){

    if(this.chat.adminId){


    this.chatRoomServ.updateChat(this.id,this.chat).subscribe(data=>{

      console.log(data);

      this.goBack();
     

    })
  }
  }
  
  goBack(){

    this.router.navigate(['inbox',this.chat.adminId])
  }

  

}
