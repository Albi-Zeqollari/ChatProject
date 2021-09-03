import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ChatRoom } from '../Intefaces/ChatRoom';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {


  }
}