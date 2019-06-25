import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {IUser} from '../models/IUser'

@Injectable()
export class UserService {
  //apiUrl = 'https://api.github.com/users'
  apiUrl = 'https://localhost:44353/api/Users'

  constructor(private http: HttpClient) {}

  getUsers() {
    //return this.http.get(`${this.apiUrl}?per_page=100`)
    return this.http.get(`${this.apiUrl}`)
  }

  getUser(userId: number) : Observable<IUser> {
    console.log('UserService:getUser userId', userId)

    let url = `${this.apiUrl}/${userId}`
    console.log('url', url);

    return this.http.get<IUser>(url)
  }

  updateUser(user: IUser) {
    console.log('updatuser on user service is invoked', user)

    return this.http.put(this.apiUrl, user)
  }
}
