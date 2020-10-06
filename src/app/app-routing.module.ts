import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CardComponent} from './card/card.component';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {CreateComponent} from './create/create.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppComponent, children: [
          {path: '', redirectTo: '/', pathMatch: 'full'},
          {path: '', component: MainComponent},
          {path: 'card/:id', component: CardComponent},
          {path: 'create', component: CreateComponent}
        ]
      }
    ], { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
