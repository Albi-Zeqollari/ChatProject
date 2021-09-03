import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoom } from '../Intefaces/ChatRoom';
import { User } from '../Intefaces/User';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.component.html',
  styleUrls: ['./create-chatroom.component.scss']
})
export class CreateChatroomComponent implements OnInit {

  id!:String
  chat:ChatRoom=new ChatRoom
  users:any=[]
  newUser!:User;
  constructor(private chatRoomServ:ChatService,private userService:UserService,private router:Router,private route:ActivatedRoute,private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data=>{

      this.newUser = data;

      console.log(this.newUser);
      
      
    })
    this.getUsers()
  }


  createChatRoom(){
   
    console.log(this.chat.adminId = this.id);
    this.chat.usersListId.push(this.newUser);
    this.chatRoomServ.createChat(this.chat).subscribe(data=>{

     console.log(data);
     
    })
    this.errorSnackbar();
  }


  getUsers(){

    this.userService.getUsers().subscribe(data=>{

      this.users = data;
    })
  }

  onSubmit(){

    try{
      this.createChatRoom();
      this.goToInbox();
      this.openSnackbar();
    }catch{

      this.errorSnackbar();
    }

    

  }

  goBack(){

    this.router.navigate(['inbox',this.id])
  }

  goToInbox(){

    this.router.navigate(['inbox',this.id])
  }

  openSnackbar(){

    this.snackBar.open("Succesfully created","Dissmis")
  }

  errorSnackbar(){

    this.snackBar.open("Please fill the form","Dissmis")
  }

}
