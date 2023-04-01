import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ServerDetailsComponent } from './server-details/server-details.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { VirualServerListComponent } from './virual-server-list/virual-server-list.component';

const routes: Routes = [
  { path: '', redirectTo:'/servers', pathMatch:'full' },
  { path: 'servers', component:VirualServerListComponent },
  { path: 'servers/:id', component:ServerDetailsComponent },
  { path: 'servers/:serverId/sites/:id', component: SiteDetailsComponent },
  { path: 'search', component:SearchComponent },
  { path: '**', redirectTo:'/servers', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
