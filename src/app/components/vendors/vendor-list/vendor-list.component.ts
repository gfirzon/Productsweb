import { Component, OnInit } from "@angular/core"
import { VendorService } from '../../../services/vendor.service'

@Component({
    selector: "vendor-list",
    templateUrl: "./vendor-list.component.html"
})
export class VendorListComponent {
    vendors: any

    constructor(private vendorService: VendorService) {     
    }  
    
    ngOnInit() {
        this.vendors = this.vendorService.getVendors();
    }
}