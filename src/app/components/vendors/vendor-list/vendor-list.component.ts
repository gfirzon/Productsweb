import { Component, OnInit } from "@angular/core"
import { VendorService } from '../../../services/vendor.service'
import { IVendor } from '../../../models/IVendor'

@Component({
    selector: "vendor-list",
    templateUrl: "./vendor-list.component.html"
})
export class VendorListComponent {
    vendors: IVendor[]

    constructor(private vendorService: VendorService) {     
    }  
    
    ngOnInit() {
        this.vendorService.getVendors().subscribe(
            data => this.vendors = data
        )
    }
}