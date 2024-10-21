import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../shared/services/cart.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
    private cartService: CartService = inject(CartService);
    protected cart = this.cartService.cart;

    protected toggle() {
      this.cartService.toggleCart();
    }

    protected remove(productId: number) {
      this.cartService.removeItem(productId);
    }
}
