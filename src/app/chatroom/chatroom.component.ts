import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatRoom } from '../Intefaces/ChatRoom';
import { ChatService } from '../services/chat.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from "jquery";
import { Messages } from '../Intefaces/Messages';
import { User } from '../Intefaces/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { event } from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {


  private serverUrl = 'http://localhost:8080/ws'
  
  private stompClient!: Stomp.Client;

  chat:ChatRoom = new ChatRoom;
  message:any=[]
  chatt!:any
  msg:Messages= new Messages;
  id!:any
  userid!:any
  newUser:any=[]
  user!:User[]
  messagesOfRoom:any[]=[]
  chatroom:ChatRoom[]=[]
  messagesofChat:any=[]
  newChat:any=[]
  displayedColums:String[]=["participants"]
  userChat:any=[]

  @ViewChild('input', { static: true }) textMessage!: ElementRef;

  mytext: string = "";

  constructor(private chatroomService:ChatService,textMessage:ElementRef,private router:Router,private userService:UserService,
    private route:ActivatedRoute,private messageServ:MessageService,private snackBar:MatSnackBar) {
    
    this.textMessage = textMessage;
    this.initializeWebSocketConnection()

  
  }

  initializeWebSocketConnection(){

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame: any) {
      that.stompClient.subscribe("/topic/public", (data:any) => {

        that.message = JSON.parse(data.body)
    
        if(that.newChat.id == that.message.chatId){

          that.messagesOfRoom.push(JSON.parse(data.body))
       
        }
 
      });
    });


  }

  sendMessage(event: any) {

    this.mytext = this.textMessage.nativeElement.value;
    
    if ( this.mytext &&this.stompClient){

    var chatMessage = {
  
    userName:this.newUser.name, 
    userId:this.userid,
    textMessage:this.mytext,
    chatId:this.newChat.id,
    time: new Date()
    }
    this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage),
    
    
    );
    
  this.handleClear();

    
    
  }
  }


  ngOnInit(): void {

      
    this.id = this.route.snapshot.params['id'];
    this.userid= this.route.snapshot.params['userid']

    this.newChat = new ChatRoom()

    this.chat.adminId=this.userid
    this.chatroomService.getChatsById(this.id,this.userid).subscribe(data=>{

     this.newChat = data
     console.log(this.newChat);
     
   })

   this.newUser = new User()

   this.userService.getUserById(this.userid).subscribe(data=>{


    this.newUser= data;
    console.log(data);
    
    
   })

   this.getChatRoom();

   this.getUserByChatId();

   this.findbychat();
  
 
  
  }

findbychat(){

  this.messageServ.findByChat(this.id).subscribe(data=>{

    this.messagesofChat = data
  })
}


  getChatRoom(){

    this.chatroomService.getChats().subscribe(data=>{

      this.chatroom = data;
      console.log(this.chatroom);
      

    })
  }


  getUserByChatId(){

    this.userService.getUserByChatId(this.id).subscribe(data=>{

      this.userChat = data;
      console.log("data" +this.userChat);
      
    })
  }


  goToInbox(id:String){

    this.router.navigate(['inbox',id])
  }

  handleClear(){

    this.textMessage.nativeElement.value=''
  }

  deleteMessage(id:String){
    
    if(confirm("Are you sure?")){

    this.messageServ.deleteMsg(id).subscribe(data=>{

      this.messagesOfRoom=this.messagesOfRoom.filter(m => m.id != id )
      this.findbychat()
      this.openSnackbar();
    
    })
  }
  }


  leaveChat(){

  }



  openSnackbar(){

    this.snackBar.open("Succesfully deleted","Dismiss")
  }

}
