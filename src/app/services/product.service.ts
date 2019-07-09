import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'
import {IProduct} from '../models/IProduct'

@Injectable()
export class ProductService {
  //apiUrl = 'https://api.github.com/users'
  apiUrl = 'https://localhost:44353/api/Products'

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.apiUrl}`)
  }

  getProduct(productId: number) : Observable<IProduct> {
    console.log('ProductService:getProduct productId', productId)

    let url = `${this.apiUrl}/${productId}`
    console.log('url', url);

    return this.http.get<IProduct>(url)
  }

  updateProduct(product: IProduct) {
    console.log('updateProduct on product service is invoked', product)

    return this.http.put(this.apiUrl, product)
  }

  createProduct(product: IProduct) : Observable<number> {
    console.log('createProduct on product service is invoked', product)

    return this.http.post<number>(this.apiUrl, product)
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
