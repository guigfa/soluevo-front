import { Route } from "@angular/router";
import { ProductComponent } from "./product/product.component";

export const PAGES_ROUTES: Route[] = [
    {
        path: '',
        redirectTo: '1',
        pathMatch: 'full'
    },
    {
        path: ':id',
        component: ProductComponent
    },
    {
        path: ':id/:section',
        component: ProductComponent
    }
]