import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {Hero} from "./hero";
import {HeroService} from "./hero.service";

@Component({
  selector: "my-heroes",
  providers: [HeroService],
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: Array <Hero> ;
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {}

  onSelect(hero: Hero): void {
      this.selectedHero = hero;
  }

  getHeroes(): void {
      this.heroService.getHeroes().then((heroes) => {
          this.heroes = heroes;
      });
  }

  ngOnInit(): void {
      this.getHeroes();
  }

  gotoDetail(): void {
      this.router.navigate(["/detail", this.selectedHero.id]);
  }

  add(heroName: string): void {
      if (!heroName) {
          return;
      }

      heroName = heroName.trim();
      if (!heroName) {
          return;
      }

      this.heroService.create(heroName)
          .then((hero) => {
              this.heroes.push(hero);
              this.selectedHero = null;
          });
  }

  delete(hero: Hero): void {
      this.heroService
          .delete(hero.id)
          .then(() => {
              this.heroes = this.heroes.filter(h => h !== hero);
              if (this.selectedHero === hero) {
                  this.selectedHero = null;
              }
          });
  }
}