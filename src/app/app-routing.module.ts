import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';
import { CreateComponent } from './create/create.component';
import { MainComponent } from './main/main.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppComponent, children: [
          { path: '', redirectTo: '/', pathMatch: 'full' },
          { path: '', component: MainComponent },
          { path: 'document/:id', component: DocumentComponent },
          { path: 'create', component: CreateComponent },
          { path: '**', redirectTo: '/' }
        ]
      }
    ], { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
