import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';
import { updateProfilGuard } from 'src/app/guards/update-profil.guard';
import { applicationGuard } from 'src/app/guards/application.guard';

const routes: Routes = [
  {
    path: '',
    component: CategorieComponent,
    canActivate: [updateProfilGuard],
    data: {
      title: $localize`Categorie`,
    },
  },
  {
    path: 'add',
    component: AddCategorieComponent,
    canActivate: [applicationGuard],
    data: {
      title: 'Ajouter categorie',
    },
  },
  {
    path: 'update/:id',
    component: UpdateCategorieComponent,
    canActivate: [applicationGuard],
    data: {
      title: 'Modifier categorie',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorieRoutingModule {}
