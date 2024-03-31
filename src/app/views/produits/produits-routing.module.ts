import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';

const routes: Routes = [
  {
    path: '',
    component: ProduitsComponent,
    data: {
      title: $localize`Produits`,
    },
  },
  {
    path: 'add-produits',
    component: AddProduitComponent,
    data: {
      title: 'add-produits',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsRoutingModule {}
