import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpClient } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IProductList, IProductDTO } from './product.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<IProductList> {
        return this.http
            .get<IProductList>('http://localhost:56441/api/Product');
    }

    saveProduct(product: IProductDTO): Observable<boolean> {
        const addLink = product.links.find(link => link.rel === 'add');
        if (addLink) {
            return this.http
                .post<boolean>('http://localhost:56441/' + addLink.href, product.data);
        }
        const saveLink = product.links.find(link => link.rel === 'edit');
        if (saveLink) {
            return this.http
                .put<boolean>('http://localhost:56441/' + saveLink.href, product.data);
        }
        return Observable.of(false);
    }

    deleteProduct(product: IProductDTO): Observable<boolean> {
        const deleteLink = product.links.find(link => link.rel === 'delete');
        if (deleteLink && confirm('delete this product?')) {
            return this.http
                .delete<boolean>('http://localhost:56441/' + deleteLink.href);
        }
        return Observable.of(false);
    }
}
