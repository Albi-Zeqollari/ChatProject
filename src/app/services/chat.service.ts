import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRoom } from '../Intefaces/ChatRoom';

@Injectable({
  providedIn: 'root'
})
export class ChatService {



  private baseUrl = "http://localhost:8080/chat-rooms"
  private baseUrl1 = "http://localhost:8080/chat-room"
  private url = "http://localhost:8080/chat"

  constructor(private http:HttpClient) { }


  getChats():Observable<ChatRoom[]>{

    return this.http.get<ChatRoom[]>(`${this.baseUrl}`)
  }

  getChatsById(id:String,userid:String):Observable<ChatRoom>{

    return this.http.get<ChatRoom>(`${this.baseUrl}/${id}/${userid}`)
  }
  getChatById(id:String):Observable<ChatRoom>{

    return this.http.get<ChatRoom>(`${this.baseUrl1}/${id}`)
  }

  createChat(chat:ChatRoom):Observable<Object>{

    return this.http.post(`${this.baseUrl}`,chat);
  }

  deleteChat(id:String):Observable<Object>{

    return this.http.delete(`${this.baseUrl}/${id}`)
  }
  updateChat(id:String,chat:ChatRoom):Observable<Object>{

    return this.http.put(`${this.baseUrl1}/${id}`,chat);
  }

}
