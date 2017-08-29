import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";

// import {DashboardComponent} from "./dashboard.component";
// import {HeroesComponent}  from "./heroes.component";
// import {HeroDetailComponent} from "./hero-detail.component";
// import {HeroService} from "./hero.service";

import {BinaryTreeComponent} from "./data-structures/binary-tree/binary-tree.component";
import {LinkedListComponent} from "./data-structures/linked-list/linked-list.component";
import {QueueComponent} from "./data-structures/queue/queue.component";
import {SearchComponent} from "./search/search.component";
import {StackComponent} from "./data-structures/stack/stack.component";
import {ArraySearchComponent} from "./search/array-search.component";
import {StringSearchComponent} from "./search/string-search.component";
import {SortComponent} from "./sort/sort.component";
import {GraphComponent} from "./data-structures/graph/graph.component";

import {WebWorkerService} from "angular2-web-worker/web-worker.service";
//import {WebWorkerService} from "angular2-web-worker/web-worker.service";

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from "angular-in-memory-web-api";
//import { InMemoryDataService }  from "./in-memory-data.service";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, BinaryTreeComponent, LinkedListComponent, 
                 QueueComponent, SearchComponent, StackComponent, ArraySearchComponent,
                 StringSearchComponent, SortComponent, GraphComponent //,
                  //DashboardComponent, HeroesComponent, HeroDetailComponent
                ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    WebWorkerService
    //HeroService
  ]
})
export class AppModule { }
