import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Intefaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url="http://localhost:8080/users"
   private url1="http://localhost:8080/login"
   private url2="http://localhost:8080/us"

  constructor(private http:HttpClient) { }



  getUsers():Observable<User[]>{

    return this.http.get<User[]>(`${this.url}`)
  }

  createUser(user:User):Observable<Object>{

    return this.http.post(`${this.url}`,user)
  }

  LoginUser(user:User):Observable<any>{

    return this.http.post(`${this.url1}`,user)
  }

  getUserById(id:String):Observable<User>{

    return this.http.get<User>(`${this.url}/${id}`)
  }

  updateUser(user:User,id:String):Observable<Object>{

    return this.http.put(`${this.url}/${id}`,user);
  }

  getUserByChatId(chatid:String):Observable<User>{

    return this.http.get<User>(`${this.url2}/${chatid}`)
  }

}
