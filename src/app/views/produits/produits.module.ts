import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsRoutingModule } from './produits-routing.module';
import { FormsModule } from '@angular/forms';
import { ProduitsComponent } from './produits.component';

@NgModule({
  declarations: [ProduitsComponent],
  imports: [CommonModule, ProduitsRoutingModule, FormsModule],
})
export class ProduitsModule {}
