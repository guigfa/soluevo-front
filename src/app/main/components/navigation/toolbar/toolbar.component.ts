import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
    private cartService = inject(CartService);
    protected pages = ['Home', 'Shop', 'Sobre', 'Contato'];
    protected icons = ['person', 'search', 'favorite', 'shopping_cart'];

    protected openCart() {
      this.cartService.toggleCart();
    }
}
