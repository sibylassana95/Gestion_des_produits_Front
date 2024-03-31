import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { ProduitsRoutingModule } from './produits-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitsComponent } from './produits.component';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../widgets/widgets.module';
import { AddProduitComponent } from './add-produit/add-produit.component';
@NgModule({
  declarations: [ProduitsComponent, AddProduitComponent],
  imports: [
    CommonModule,
    ProduitsRoutingModule,
    FormsModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
  ],
})
export class ProduitsModule {}
