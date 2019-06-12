import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router"
import { Location } from '@angular/common'
import { UserService } from '../../../services/user.service'

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

    user: any

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private location: Location
      ) {}

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        const id = + this.route.snapshot.paramMap.get('id');
        this.user = this.userService.getUser(id)
            .subscribe(user => this.user = user);
        // this.heroService.getHero(id)
        //   .subscribe(hero => this.hero = hero);
      }
}