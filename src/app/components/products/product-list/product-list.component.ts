import { Component, OnInit } from "@angular/core"
import {ProductService } from '../../../services/product.service'

@Component({
    selector: "product-list",
    templateUrl: "./product-list.component.html"
})
export class ProductListComponent {
    products: any

    constructor(private productService: ProductService) {     
    }  
    
    ngOnInit() {
        this.products = this.productService.getProducts();
    }
}