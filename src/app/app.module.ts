import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

// Directives
import { StatusColorDirective } from './directives/status-color.directive';

// Components
import { VirualServerListComponent } from './virual-server-list/virual-server-list.component';
import { ServerDetailsComponent } from './server-details/server-details.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { NewServerComponent } from './dialogs/new-server/new-server.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { NewSiteComponent } from './dialogs/new-site/new-site.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    VirualServerListComponent,
    ServerDetailsComponent,
    SiteDetailsComponent,
    NewServerComponent,
    DeleteDialogComponent,
    StatusColorDirective,
    NewSiteComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
