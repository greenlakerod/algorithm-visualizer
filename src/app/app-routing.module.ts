import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./dashboard.component";
import {HeroesComponent} from "./heroes.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {LinkedListComponent} from "./data-structures/linked-list/linked-list.component";

const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "/linked-list"},
    {path: "linked-list", component: LinkedListComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "heroes", component: HeroesComponent},
    {path: "detail/:id", component: HeroDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}