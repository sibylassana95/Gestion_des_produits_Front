import { DocsComponentsModule } from './../../../components/docs-components.module';
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
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../widgets/widgets.module';
import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';

@NgModule({
  declarations: [
    CategorieComponent,
    AddCategorieComponent,
    UpdateCategorieComponent,
  ],
  imports: [
    CommonModule,
    CategorieRoutingModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CategorieModule {}
