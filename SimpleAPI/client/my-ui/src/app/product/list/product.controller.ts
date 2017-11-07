import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { IProductList, IProductDTO } from '../productModel';
@Component({
    selector: 'app-product-list',
    templateUrl: 'prodcut.list.component.html'
})

export class ProductListComponent implements OnInit {

    products: IProductList;

    @Output()
    onProductSelection: EventEmitter<IProductDTO> = new EventEmitter<IProductDTO>();

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.loadProducts();
    }
    loadProducts() {
        this.productService
            .getAll()
            .subscribe(response => {
                this.products = response;
            });
    }
    viewDetail(product: IProductDTO) {
        alert('Show Details');
    }
    onEdit(product: IProductDTO): void {
        this.onProductSelection.emit(product);
    }

    onDelete(product: IProductDTO) {
        this.productService
            .deleteProduct(product)
            .subscribe(() => {
                this.loadProducts();
            });
    }
}
