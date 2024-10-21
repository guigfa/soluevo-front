import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from '../../../../shared/models/product';
import { CartService } from '../../../../shared/services/cart.service';
import { Review } from '../../../../shared/models/review';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, CurrencyPipe, TitleCasePipe, NgClass, ButtonComponent],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss'
})
export class MainSectionComponent implements OnInit, OnChanges {
    Math = Math;
    @Input({ required: true }) product!: Product;
    private cartService: CartService = inject(CartService);
    protected quantity: FormControl = new FormControl(1);
    protected stars: number[] = Array(5).fill(0);
    protected averageRating!: number;
    protected selectedSize!: string;

    ngOnInit(): void {
      this.averageRating = this.calculateAverageRating(this.product.reviews);
      this.selectedSize = this.product.sizes[0]; 
    }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes['product'].currentValue !== changes['product'].previousValue) {
        this.quantity.setValue(1);
      }
    }

    private calculateAverageRating(reviews: Review[]): number {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      return totalRating / reviews.length;
  }

    protected increment() { 
      this.quantity.setValue(this.quantity.value + 1); 
    }

    protected decrement() { 
      if(this.quantity.value > 1) this.quantity.setValue(this.quantity.value - 1); 
    }

    protected addToCart() {
      console.log(this.quantity.value);
      this.cartService.addItem(
        this.product, 
        this.quantity.value, 
        this.product.promotion ? this.product.price - (this.product.price * (this.product.promotion / 100)) : this.product.price
      );
      this.cartService.toggleCart();
    }
}
