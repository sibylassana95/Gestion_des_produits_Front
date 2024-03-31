import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';

const routes: Routes = [
  {
    path: '',
    component: ProduitsComponent,
    data: {
      title: $localize`Produits`,
    },
  },
  {
    path: 'add',
    component: AddProduitComponent,
    data: {
      title: 'Ajouter produit',
    },
  },
  {
    path: 'update/:id',
    component: UpdateProduitComponent,
    data: {
      title: 'Modifier produit',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsRoutingModule {}
