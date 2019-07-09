import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from "@angular/router"
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../../../services/user.service'
import { IUser } from '../../../models/IUser'

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

    userForm: FormGroup
    isNew: boolean

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private location: Location,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getUser()

        this.userForm = this.formBuilder.group({
            userID: [''],
            userName: ['', [Validators.required]],
            userPassword: ['', [Validators.required]],
            isActive: ['', [Validators.required]],
            roleID: ['', [Validators.required]]
        })
    }

    getUser(): void {
        const id = + this.route.snapshot.paramMap.get('id')
        if (id) {
            this.isNew = false
            this.userService.getUser(id)
                .subscribe(
                    (user: IUser) => this.showUser(user)
                )
        }
        else {
            this.isNew = true
        }
    }

    //perform work of binding retrived vendor data to form control
    showUser(user: IUser) {
        this.userForm.patchValue({
            userID: user.userID,
            vuserName: user.userName,
            vendorPhone: user.userPassword,
            isActive: user.isActive,
            roleID: user.roleID,
        })
    }

    createUser() {
        if (this.userForm.valid) {
            console.log('User form is valid!!', this.userForm.value)

            this.userService.createUser(this.userForm.value)
                .subscribe((response) => {
                    console.log('create response ', response)
                    this.toastr.success("User information saved")
                })
        }
        else {
            //alert('User form is not valid!!')
            this.toastr.warning("User information is not complete to be saved")
        }
    }

    updateUser() {
        if (this.userForm.valid) {
            console.log('User form is valid!!', this.userForm.value)

            this.userService.updateUser(this.userForm.value)
                .subscribe((response) => {
                    console.log('update response ', response)
                    this.toastr.success("User information saved")
                })
        }
        else {
            //alert('User form is not valid!!')
            this.toastr.warning("User information is not complete to be saved")
        }
    }


    onSubmit() {
        if (this.isNew == false) {
            this.updateUser()
        }
        else {
            this.createUser()
        }

    }

    onCancel() {
        console.log('cancel clicked ')
        this.router.navigateByUrl('/users')
    }
}