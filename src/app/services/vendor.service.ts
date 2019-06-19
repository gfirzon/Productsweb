import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VendorService {
  //apiUrl = 'https://api.github.com/users'
  apiUrl = 'https://localhost:44353/api/Vendors'

  constructor(private http: HttpClient) {}

  getVendors() {
    //return this.http.get(`${this.apiUrl}?per_page=100`)
    return this.http.get(`${this.apiUrl}`)
  }

  getVendor(vendorId: number) {
    console.log('vendorId', vendorId);

    let url = `${this.apiUrl}/${vendorId}`
    console.log('url', url);
    
    return this.http.get(url)
  }

}
