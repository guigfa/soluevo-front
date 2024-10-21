import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImagesComponent } from '../../components/product/images/images.component';
import { MainSectionComponent } from '../../components/product/main-section/main-section.component';
import { BreadcrumbsComponent } from '../../components/navigation/breadcrumbs/breadcrumbs.component';
import { RelatedProductsComponent } from '../../components/product/related-products/related-products.component';
import { CartComponent } from '../../components/cart/cart.component';
import { CartService } from '../../../shared/services/cart.service';
import { DetailsComponent } from '../../components/product/details/details.component';
import { Breadcrumb } from '../../../shared/models/breadcrumb';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AsyncPipe, MainSectionComponent, ImagesComponent, RelatedProductsComponent, CartComponent, DetailsComponent, BreadcrumbsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy = inject(DestroyRef);
  private id = +this.activatedRoute.snapshot.params['id'];
  protected product$!: Observable<Product | null>;
  protected isCartOpen$ = this.cartService.isCartOpen$;
  protected breadcrumbs!: Breadcrumb[];

  ngOnInit(): void {
    this._setBreadcrumbs();
    this._getParams();
  }

  private _setBreadcrumbs() {
    this.breadcrumbs = [
      { path: '/', label: 'Home', trackBy: 0 },
      { path: '/shop', label: 'Shop', trackBy: 1 },
    ]
  }

  private _getParams() {


    this.activatedRoute.params
      .pipe(
        takeUntilDestroyed(this.destroy)
      )
      .subscribe(params => {
        this.id = +params['id'];
        const section = params['section'];

        if (!section) {
          this.router.navigate(['description'], {
            relativeTo: this.activatedRoute,
            replaceUrl: true
          });
        }
        this._setBreadcrumbs();
        this._getProduct(this.id);
      });
  }

  private _getProduct(id: any) {
    this.product$ = this.productService.getProduct(id).pipe(
      tap(res => !res ? this.router.navigate(['/404']) : null),
      map(res => {
        this.breadcrumbs.push({ path: `/product/${this.id}`, label: res?.name!, trackBy: 2 });
        return res;
      }),
    );
  }

  protected toggleCart() {
    this.cartService.toggleCart();
  }
}