import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from "@angular/router"
import { ToastrService } from 'ngx-toastr'
import { ProductService } from '../../../services/product.service'
import { IProduct } from '../../../models/IProduct'

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

    productForm: FormGroup
    isNew: boolean

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private location: Location,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getProduct()

        this.productForm = this.formBuilder.group({
            productID: ['-1'],
            productName: ['', [Validators.required]],
            productDescription: ['', [Validators.required]],
            unitsInStock: ['', [Validators.required]],
            sellPrice: ['', [Validators.required]],
            discountPercentage: ['', [Validators.required]],
            unitsMax: ['', [Validators.required]],
        })
    }

    getProduct(): void {
        const id = + this.route.snapshot.paramMap.get('id')
        if (id) {
            this.isNew = false
            this.productService.getProduct(id)
                .subscribe(
                    (product: IProduct) => this.showProduct(product)
                )
        }
        else {
            this.isNew = true
        }
    }

    //perform work of binding retrived vendor data to form control
    showProduct(product: IProduct) {
        this.productForm.patchValue({
            productID: product.productID,
            productName: product.productName,
            productDescription: product.productDescription,
            unitsInStock: product.unitsInStock,
            sellPrice: product.sellPrice,
            discountPercentage: product.discountPercentage,
            unitsMax: product.unitsMax
        })
    }

    createProduct() {
        if (this.productForm.valid) {
            console.log('Product form is valid!!', this.productForm.value)

            this.productService.createProduct(this.productForm.value)
                .subscribe((response) => {
                    console.log('create response ', response)
                    this.toastr.success("Product information saved")
                })
        }
        else {
            //alert('User form is not valid!!')
            this.toastr.warning("Product information is not complete to be saved")
        }
    }

    updateProduct() {
        if (this.productForm.valid) {
            console.log('Product form is valid!!', this.productForm.value)

            this.productService.updateProduct(this.productForm.value)
                .subscribe((response) => {
                    console.log('update response ', response)
                    this.toastr.success("Product information saved")
                })
        }
        else {
            //alert('User form is not valid!!')
            this.toastr.warning("Product information is not complete to be saved")
        }
    }


    onSubmit() {
        if (this.isNew == false) {
            this.updateProduct()
        }
        else {
            this.createProduct()
        }

    }

    onCancel() {
        console.log('cancel clicked ')
        this.router.navigateByUrl('/products')
    }
}