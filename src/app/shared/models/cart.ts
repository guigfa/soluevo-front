import { CartItem } from "./cartItem";

export interface Cart {
    items: CartItem[];
    value: number;
}