import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Intefaces/User';
import { UserService } from '../services/user.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from "jquery";
import { Messages } from '../Intefaces/Messages';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  msg:Messages= new Messages;
  user!:User[]
  id!:String
  chatId!:String
  message!:Messages[]
  newUser:any=[]
  displayedColums:String[]=["participants"]
  constructor(private router:Router,private userService:UserService,private route:ActivatedRoute,
    private messageServ:MessageService) {   this.initializeWebSocketConnection()}

  private serverUrl = 'http://localhost:8080/socket'
  
  private stompClient!: Stomp.Client;


  initializeWebSocketConnection(){

    let messages: string[] = [];

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame: any) {
      that.stompClient.subscribe("/chat", (message: { body: string; }) => {

        
        if(message.body) {

          // $(".chat").append("<div class='message'><button class='btn'>"+message.body+"</button</div>")

          that.getMessage();


        };
        
      });
    });
  }
 
  sendMessage(message: any){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
    this.createMessage()
 
  }

  
  createMessage(){


    this.msg.time = new Date()

    this.msg.userName = this.newUser.name
  
    this.msg.textMessage = this.msg.textMessage

    this.msg.userId = this.id

   
    this.messageServ.createMessage(this.msg).subscribe(data=>{




      
    })
  }

  getMessage(){

    this.messageServ.getMessage().subscribe(data=>{

      this.message = data;
      
    })
  }


  deleteMsg(id:String){


      this.messageServ.deleteMsg(this.id).subscribe(data=>{

        this.getMessage();

      })
  
  
  }


  ngOnInit(): void {


    this.id = this.route.snapshot.params['id'];

    this.newUser = new User()

    this.userService.getUserById(this.id).subscribe(data=>{

      this.newUser = data;

      
    })

    this.getUser();
    this.getMessage();

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

  goToCreateGroup(id:String){

    this.router.navigate(['create-group',id])
  }
}
