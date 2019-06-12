import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { ContactComponent } from './components/contact/contact.component'
import { UsersComponent } from './components/users/users.component'
import { UserDetailComponent } from './components/users/user-detail/user-detail.component'
import { UserListComponent } from './components/users/user-list/user-list.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'users',
    component: UserListComponent
    //loadChildren: 'app/users/users.module#UsersModule'
  },
  {
    path: 'user/:id',
    component: UserDetailComponent
    //loadChildren: 'app/users/users.module#UsersModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
