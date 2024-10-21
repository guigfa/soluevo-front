import { Injectable } from "@angular/core";
import { Cart } from "../models/cart";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cart!: Cart;
    private isCartOpen = new BehaviorSubject<boolean>(false);
    public isCartOpen$ = this.isCartOpen.asObservable();

    constructor() {
        this.cart = { items: [], value: 0 };
    }

    addItem(product: Product, quantity: number, price: number) {
        const item = this.cart.items.find(item => item.product.id === product.id);
        if (item) {
            item.quantity = item.quantity + quantity;
        } else {
            this.cart.items.push({ product, quantity, price });
        }

        this._updateCartValue();
    };

    removeItem(productId: number) {
        this.cart.items = this.cart.items.filter(item => item.product.id !== productId);
        this._updateCartValue();
    };

    private _updateCartValue() {
        this.cart.value = this.cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    public toggleCart() {
        this.isCartOpen.next(!this.isCartOpen.value);
    }
}