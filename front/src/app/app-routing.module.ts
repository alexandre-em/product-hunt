import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'collections',
    loadChildren: () => import('./views/collections/collections.module').then((m) => m.CollectionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
