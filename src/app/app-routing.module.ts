import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";

//import {DashboardComponent} from "./dashboard.component";
//import {HeroesComponent} from "./heroes.component";
//import {HeroDetailComponent} from "./hero-detail.component";
import {BinaryTreeComponent} from "./data-structures/binary-tree/binary-tree.component";
import {LinkedListComponent} from "./data-structures/linked-list/linked-list.component";
import {QueueComponent} from "./data-structures/queue/queue.component";
import {SearchComponent} from "./search/search.component";
import {StackComponent} from "./data-structures/stack/stack.component";
import {ArraySearchComponent} from "./search/array-search.component";
import {StringSearchComponent} from "./search/string-search.component";
import {SortComponent} from "./sort/sort.component";
import {GraphComponent} from "./data-structures/graph/graph.component";

const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "/linked-list"},
    {path: "binary-tree", component: BinaryTreeComponent},
    {path: "graph", component: GraphComponent},
    {path: "linked-list", component: LinkedListComponent},
    {path: "queue", component: QueueComponent},
    {path: "stack", component: StackComponent},
    {path: "search", component: SearchComponent},
    {path: "sort", component: SortComponent}
    // {path: "dashboard", component: DashboardComponent},
    // {path: "heroes", component: HeroesComponent},
    // {path: "detail/:id", component: HeroDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    //public get routes(): Array<Route> { return routes; }
}