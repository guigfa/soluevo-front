import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product } from "../models/product";
import { PRODUCT_MOCK } from "../mocks/products.mock";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public getProduct(id: number): Observable<Product| null> {
        return of(PRODUCT_MOCK.find(product => product.id === id) ?? null);
    }

    public getProductsInBatch(ids: number[]): Observable<Product[]> {
        return of(PRODUCT_MOCK.filter(product => ids.includes(product.id)));
    }
}