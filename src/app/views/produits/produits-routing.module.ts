import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { applicationGuard } from '../../guards/application.guard';
import { updateProfilGuard } from '../../guards/update-profil.guard';

const routes: Routes = [
  {
    path: '',
    component: ProduitsComponent,
    canActivate: [updateProfilGuard],
    data: {
      title: $localize`Produits`,
    },
  },
  {
    path: 'add',
    component: AddProduitComponent,
    canActivate: [applicationGuard],
    data: {
      title: 'Ajouter produit',
    },
  },
  {
    path: 'update/:id',
    component: UpdateProduitComponent,
    canActivate: [applicationGuard],
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
