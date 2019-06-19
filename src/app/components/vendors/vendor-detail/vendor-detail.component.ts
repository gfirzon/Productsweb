import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router"
import { Location } from '@angular/common'
import { VendorService } from '../../../services/vendor.service'


@Component({
    selector: 'vendor-detail',
    templateUrl: './vendor-detail.component.html'
})
export class VendorDetailComponent implements OnInit {

    vendor: any

    constructor(
        private route: ActivatedRoute,
        private vendorService: VendorService,
        private location: Location
      ) {}

    ngOnInit(): void {
        this.getVendor();
    }

    getVendor(): void {
        const id = + this.route.snapshot.paramMap.get('id');
        this.vendor = this.vendorService.getVendor(id)
            .subscribe(vendor => this.vendor = vendor);
        // this.heroService.getHero(id)
        //   .subscribe(hero => this.hero = hero);
      }
}