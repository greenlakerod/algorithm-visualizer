import {Component} from "@angular/core";

@Component({
    selector: "my-app",
    styleUrls: ["./app.component.css"],
    templateUrl: "./app.component.html"
})
export class AppComponent {
    public title: string = "Algorithms & Data Structures";
    public activeRoute: string = "/linked-list";

    public routes: Array<{ route: string; label: string; }> = [
        { route: "/linked-list", label: "Linked List" }, 
        { route: "/queue", label: "Queue" }, 
        { route: "/stack", label: "Stack" }
    ];

    public clickNav(route: string): void {
        this.activeRoute = route;
    }

    public isActiveRoute(route: string): boolean {
        return route === this.activeRoute;
    }
}
