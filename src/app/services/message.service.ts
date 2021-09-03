import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Messages } from '../Intefaces/Messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  private baseUrl ="http://localhost:8080/message"
  private url="http://localhost:8080/send/message"
  private url1="http://localhost:8080/msg"

  constructor(private http:HttpClient) { }



  getMessage():Observable<Messages[]>{

    return this.http.get<Messages[]>(`${this.baseUrl}`)
  }

  createMessage(message:Messages):Observable<Object>{

    return this.http.post(`${this.baseUrl}`,message);
  }
  createMessage1(message:Messages):Observable<Object>{

    return this.http.post(`${this.url}`,message);
  }



  findByChat(chatId:String):Observable<Messages>{

    return this.http.get<Messages>(`${this.url1}/${chatId}`);
  }


  deleteMsg(id:String):Observable<Object>{

   return  this.http.delete(`${this.url1}/${id}`)
  }



}
