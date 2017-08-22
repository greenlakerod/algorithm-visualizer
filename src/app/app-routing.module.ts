import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";

//import {DashboardComponent} from "./dashboard.component";
//import {HeroesComponent} from "./heroes.component";
//import {HeroDetailComponent} from "./hero-detail.component";
import {BinaryTreeComponent} from "./data-structures/binary-tree/binary-tree.component";
import {LinkedListComponent} from "./data-structures/linked-list/linked-list.component";
import {QueueComponent} from "./data-structures/queue/queue.component";
import {StackComponent} from "./data-structures/stack/stack.component";

const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "/linked-list"},
    {path: "binary-tree", component: BinaryTreeComponent},
    {path: "linked-list", component: LinkedListComponent},
    {path: "queue", component: QueueComponent},
    {path: "stack", component: StackComponent},
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