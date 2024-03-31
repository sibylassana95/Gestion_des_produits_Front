import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  WidgetModule,
} from '@coreui/angular';
import { ProduitsRoutingModule } from './produits-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitsComponent } from './produits.component';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../widgets/widgets.module';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
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
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    DocsComponentsModule,
    ProgressModule,
    ChartjsModule,
  ],
})
export class ProduitsModule {}
