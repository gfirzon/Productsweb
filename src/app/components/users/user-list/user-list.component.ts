import { Component, OnInit } from "@angular/core"
import { UserService } from '../../../services/user.service'

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html"
})
export class UserListComponent {
    users

    constructor(private userService: UserService) {}  
    
    ngOnInit() {
        this.users = this.userService.getUsers();
    }
}