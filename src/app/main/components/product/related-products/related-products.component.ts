import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Product } from '../../../../shared/models/product';
import { ProductService } from '../../../../shared/services/product.service';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, NgClass, CurrencyPipe, ButtonComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss'
})
export class RelatedProductsComponent implements OnInit, OnChanges {
  @Input({ required: true }) productsIds!: number[];
  private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  protected products$!: Observable<Product[]>;
  protected visibleProducts: number = 4;


  ngOnInit(): void {
    this._getProducts(this.productsIds);
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productsIds'].currentValue !== changes['productsIds'].previousValue) {
      this._getProducts(this.productsIds);
    }
  }

  private _getProducts(ids: number[]) {
    this.products$ = this.productService.getProductsInBatch(ids);
  }

  protected redirect(id: number) {
    window.scrollTo(0, 0);
    this.router.navigate(['/product', id, 'description']);
  }

  protected loadMore() {
    this.visibleProducts += 4;
  }

}
