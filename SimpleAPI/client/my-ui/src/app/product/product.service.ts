import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpClient } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IProductList, IProductDTO } from './productModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<IProductList> {
        return this.http
            .get<IProductList>('http://localhost:56441/api/Product');
    }

    saveProduct(product: IProductDTO): Observable<any> {
        const saveLink = product.links.find(link => link.rel === 'edit');
        if (saveLink) {
            return this.http
                .put<IProductDTO>('http://localhost:56441/' + saveLink.href, product.data);
        }
    }

    deleteProduct(product: IProductDTO): Observable<any> {
        const deleteLink = product.links.find(link => link.rel === 'delete');
        if (deleteLink && confirm('delete this product?')) {
            return this.http
                .delete<any>('http://localhost:56441/' + deleteLink.href);
        }
    }
}
