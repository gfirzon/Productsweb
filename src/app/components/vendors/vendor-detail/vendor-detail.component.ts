import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Location } from '@angular/common'
import { FormBuilder, Validators } from '@angular/forms'
import { VendorService } from '../../../services/vendor.service'
import { IVendor } from '../../../models/IVendor'

@Component({
    selector: 'vendor-detail',
    templateUrl: './vendor-detail.component.html'
})
export class VendorDetailComponent implements OnInit {

    vendorForm: any

    constructor(
        private route: ActivatedRoute,
        private vendorService: VendorService,
        private location: Location,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.getVendor()

        this.vendorForm = this.formBuilder.group({
            vendorID: [''],
            vendorName: ['', [Validators.required]],
            vendorPhone: ['', [Validators.required]],
            //vendorEmail: ['', [Validators.required, Validators.email]]
        })
    }

    getVendor(): void {
        const id = + this.route.snapshot.paramMap.get('id')
        this.vendorService.getVendor(id)
            .subscribe(
                (vendor: IVendor) => this.showVendor(vendor)
            )
    }

    //perform work of binding retrived vendor data to form control
    showVendor(vendor: IVendor) {
        this.vendorForm.patchValue({
            vendorID: vendor.vendorID,
            vendorName: vendor.vendorName,
            vendorPhone: vendor.vendorPhone
        })
    }

    onSubmit() {
        if (this.vendorForm.valid) {
            console.log('Vendor form is valid!!', this.vendorForm.value)
            this.vendorService.updateVendor(this.vendorForm.value)
                .subscribe((response) => {
                    console.log('update response ', response);
                })
        } else {
            alert('User form is not valid!!')
        }
    }
}