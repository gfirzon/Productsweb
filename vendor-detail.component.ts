import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from "@angular/router"
import { ToastrService } from 'ngx-toastr'
import { VendorService } from '../../../services/vendor.service'
import { IVendor } from '../../../models/IVendor'

@Component({
    selector: 'vendor-detail',
    templateUrl: './vendor-detail.component.html'
})
export class VendorDetailComponent implements OnInit {

    vendorForm: FormGroup
    isNew: boolean

    constructor(
        private route: ActivatedRoute,
        private vendorService: VendorService,
        private location: Location,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getVendor()

        this.vendorForm = this.formBuilder.group({
            vendorID: ['-1'],
            vendorName: ['', [Validators.required]],
            vendorPhone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]]
        })
    }

    getVendor(): void {
        const id = + this.route.snapshot.paramMap.get('id')
        if (id) {
            this.isNew = false
            this.vendorService.getVendor(id)
                .subscribe(
                    (vendor: IVendor) => this.showVendor(vendor)
                )
        }
        else {
            this.isNew = true
        }
    }

    //perform work of binding retrived vendor data to form control
    showVendor(vendor: IVendor) {
        this.vendorForm.patchValue({
            vendorID: vendor.vendorID,
            vendorName: vendor.vendorName,
            vendorPhone: vendor.vendorPhone,
            email: vendor.email
        })
    }

    createVendor() {
        if (this.vendorForm.valid) {
            console.log('Vendor form is valid!!', this.vendorForm.value)

            this.vendorService.createVendor(this.vendorForm.value)
                .subscribe((response) => {
                    console.log('create response ', response)
                    this.toastr.success("Vendor information saved")
                })
        }
        else {
            //alert('User form is not valid!!')
            this.toastr.warning("Vendor information is not complete to be saved")
        }
    }

    updateVendor() {
        if (this.vendorForm.valid) {
            console.log('Vendor form is valid!!', this.vendorForm.value)

            this.vendorService.updateVendor(this.vendorForm.value)
                .subscribe((response) => {
                    console.log('update response ', response)
                    this.toastr.success("Vendor information saved")
                })
        }
        else {
            //alert('User form is not valid!!')
            this.toastr.warning("Vendor information is not complete to be saved")
        }
    }


    onSubmit() {
        if (this.isNew == false) {
            this.updateVendor()
        }
        else {
            this.createVendor()
        }

    }

    onCancel() {
        console.log('cancel clicked ')
        this.router.navigateByUrl('/vendors')
    }
}