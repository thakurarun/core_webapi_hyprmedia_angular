import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { ProductService } from '../product.service';
import { IProductList, IProductDTO } from '../productModel';
import { debounce } from 'rxjs/operators/debounce';
@Component({
    selector: 'app-product-list',
    templateUrl: 'prodcut.list.html'
})

export class ProductListComponent implements OnInit {

    products: IProductList;
    selectedProduct: IProductDTO;

    @Input()
    editMode = false;
    @Output()
    onProductSelection: EventEmitter<IProductDTO>;

    onProductUpdate(product: IProductDTO) {
        const _product = this.products.items.find(item => item.data.id === product.data.id);
        _product.data.name = product.data.name;
        _product.data.price = product.data.price;
    }


    constructor(private productService: ProductService) {
        this.onProductSelection = new EventEmitter<IProductDTO>();
    }

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
        this.onProductSelection.emit(this.selectedProduct);
    }

    onEdit(product: IProductDTO): void {
        this.selectedProduct = _.cloneDeep(product);
        this.onProductSelection.emit(this.selectedProduct);
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
