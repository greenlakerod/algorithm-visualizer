import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";

import {DashboardComponent} from "./dashboard.component";
import {HeroesComponent}  from "./heroes.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from "./hero.service";

import {LinkedListComponent} from "./data-structures/linked-list/linked-list.component";

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService }  from "./in-memory-data.service";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, DashboardComponent, HeroesComponent, HeroDetailComponent, LinkedListComponent],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [HeroService]
})
export class AppModule { }
