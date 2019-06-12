import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  //apiUrl = 'https://api.github.com/users'
  apiUrl = 'https://localhost:44353/api/Users'

  constructor(private http: HttpClient) {}

  getUsers() {
    //return this.http.get(`${this.apiUrl}?per_page=100`)
    return this.http.get(`${this.apiUrl}`)
  }

  getUser(userId: number) {
    console.log('userid', userId);

    let url = `${this.apiUrl}/${userId}`
    console.log('url', url);
    
    return this.http.get(url)
  }
}
