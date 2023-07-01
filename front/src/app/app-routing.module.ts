import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./views/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'collections',
    loadChildren: () => import('./views/collections/collections.module').then((m) => m.CollectionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }