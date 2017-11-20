import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { ProductService } from '../product.service';
import { IProductList, IProductDTO } from '../productModel';

@Component({
    selector: 'app-product-list',
    templateUrl: 'prodcut.list.html'
})

export class ProductListComponent implements OnInit {

    products: IProductList;
    selectedProduct: IProductDTO;

    @Input() editMode = false;
    @Output() productSelection: EventEmitter<any> = new EventEmitter();

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(flag?: boolean) {
        this.productService
            .getAll()
            .subscribe(response => {
                this.products = response;
            });
    }

    createNewProduct() {
        this.selectedProduct = {
            data: {
                id: null,
                name: '',
                category: 'Automatic',
                price: 0.0
            }, links: [
                this.products.links.find(link => link.rel === 'add')
            ]
        };
        this.productSelection.emit(this.selectedProduct);
    }

    onEdit(product: IProductDTO): void {
        this.selectedProduct = _.cloneDeep(product);
        this.productSelection.emit(this.selectedProduct);
    }

    onDelete(product: IProductDTO) {
        this.productService
            .deleteProduct(product)
            .subscribe(res => {
                if (res) {
                    this.loadProducts();
                }
            });
    }
}
