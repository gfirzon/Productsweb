import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'

import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { HeaderComponent } from './components/header/header.component'
import { UserListComponent } from './components/users/user-list/user-list.component'
import { UserDetailComponent } from './components/users/user-detail/user-detail.component'
import { UsersComponent } from './components/users/users.component'
import { UserService } from './services/user.service'
import { VendorService } from './services/vendor.service'
import { ContactComponent } from './components/contact/contact.component'
import { VendorListComponent } from './components/vendors/vendor-list/vendor-list.component'
import { VendorDetailComponent } from './components/vendors/vendor-detail/vendor-detail.component'

import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { ProductListComponent } from './components/products/product-list/product-list.component'
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component'
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserListComponent,
    UserDetailComponent,
    UsersComponent,
    ContactComponent,
    VendorListComponent,
    VendorDetailComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UserService,
    VendorService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
