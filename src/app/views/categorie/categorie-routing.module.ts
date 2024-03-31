import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';

const routes: Routes = [
  {
    path: '',
    component: CategorieComponent,
    data: {
      title: $localize`Categorie`,
    },
  },
  {
    path: 'add',
    component: AddCategorieComponent,
    data: {
      title: 'Ajouter categorie',
    },
  },
  {
    path: 'update/:id',
    component: UpdateCategorieComponent,
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
