import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Intefaces/User';
import { UserService } from '../services/user.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from "jquery";
import { MessageService } from '../services/message.service';
import { Messages } from '../Intefaces/Messages';
import { ChatRoom } from '../Intefaces/ChatRoom';
import { ChatService } from '../services/chat.service';
import { data } from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  private serverUrl = 'http://localhost:8080/ws'
  
  private stompClient!: Stomp.Client;
 
  chat:ChatRoom = new ChatRoom;
  message:any=[]
  chatt!:any
  msg:Messages= new Messages;
  chatid!:String
  newUser:any=[]
  user!:User[]
  chats:ChatRoom[]=[]
  messagesOfRoom:any[]=[]

 
  @ViewChild('input', { static: true }) textMessage!: ElementRef;

  mytext: string = "";
  
  constructor(private router:Router,private userService:UserService,private route:ActivatedRoute,
    private messageServ:MessageService,private chatServ:ChatService,textMessage:ElementRef,private snackBar:MatSnackBar) { 

      this.textMessage = textMessage;

      
      this.initializeWebSocketConnection();
    }

  initializeWebSocketConnection(){


    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame: any) {
      that.stompClient.subscribe("/topic/public", (data:any) => {

       
      
       that.messagesOfRoom.push(JSON.parse(data.body))
       console.log(that.messagesOfRoom);
       
      
      });
    });
  }

  sendMessage(event: any) {

    this.mytext = this.textMessage.nativeElement.value;
  
    
    if ( this.mytext &&this.stompClient){
    var chatMessage = {
    
    userName:this.newUser.name,
    userId:this.newUser.id,
    textMessage:this.mytext,
    chatId:this.chat.id

  
   
    }
   
    this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage),
    
    
    );
    console.log(this.messagesOfRoom);
    
  }
  }

  ngOnInit(): void {
 
    this.chatid = this.route.snapshot.params['id'];

    this.newUser = new User()

    this.userService.getUserById(this.chatid).subscribe(data=>{

      this.newUser = data;
      
    })

    this.getChat();
   
  }

  getChat(){

    this.chatServ.getChats().subscribe(data=>{

      let chats = data;
      this.chatt = chats.filter((chat:any) => chat.usersListId.some((user:any) => user.id == this.newUser.id))
      
    })
    }

  edit(id:String){

    this.router.navigate(['userprofile',id])
  }


  deleteChat(id:String){

    if(confirm("Are you sure?")){
    if(id == this.chatid){

      this.chatServ.deleteChat(id).subscribe(data=>{

        this.getChat();

        this.openSnackbar();
        console.log("yes");
        
      })
    }else{
      this.errorSnackbar();
    }
  }
  
  }

  goToGroup(id:String){

    this.router.navigate(['groups',id])
  }

  gotoInbox(id:String){

    this.router.navigate(['inbox',id])
  }

  goToCreateGroup(id:String){

    this.router.navigate(['create-chat',id])
  }

  
  viewChatRoom(id:String,userid:String){

    this.router.navigate(['chatroom',id,userid])

  }

  editChat(id:String){

    this.router.navigate(['edit-chat',id])

  }

  openSnackbar(){

    this.snackBar.open("Successfully deleted", "Dismiss")
  }

  errorSnackbar(){

    this.snackBar.open("Only admin can delte the group","Dismiss")
  }

  logoutSnackbar(){

    this.snackBar.open("You were logged out","Dissmis")
  }
}


