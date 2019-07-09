import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { retry, catchError, tap } from 'rxjs/operators'
import { IVendor } from '../models/IVendor'

@Injectable()
export class VendorService {
  //apiUrl = 'https://api.github.com/users'
  apiUrl = 'https://localhost:44353/api/Vendors'

  constructor(private http: HttpClient) { }

  getVendors(): Observable<IVendor[]> {
    return this.http.get<IVendor[]>(`${this.apiUrl}`).pipe(
      tap(data => console.log('Vendors: ' + JSON.stringify(data))
      )
    )
  }

  getVendor(vendorId: number): Observable<IVendor> {
    console.log('VendorService:getVendor vendorId', vendorId)

    let url = `${this.apiUrl}/${vendorId}`
    console.log('url', url);

    return this.http.get<IVendor>(url)
  }

  updateVendor(vendor: IVendor) {
    console.log('updatevendor on vendor service is invoked', vendor)

    return this.http.put(this.apiUrl, vendor)
  }

  createVendor(vendor: IVendor): Observable<number> {
    console.log('createVendor on vendor service is invoked', vendor)

    return this.http.post<number>(this.apiUrl, vendor)
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
