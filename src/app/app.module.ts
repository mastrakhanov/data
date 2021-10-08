import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { MainComponent } from './main/main.component';
import { DocumentComponent } from './document/document.component';
import { CardComponent } from './document/card/card.component';
import { EditComponent } from './document/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DocumentComponent,
    CardComponent,
    EditComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
