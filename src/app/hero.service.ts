import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import {Hero} from "./hero";


@Injectable()
export class HeroService {
    private heroesUrl = "api/heroes";
    private headers = new Headers({"Content-Type": "application/json"});

    constructor(private http: Http) {}

    getHeroes(): Promise<Array<Hero>> {
        // return new Promise((resolve, reject) => {
        //     // Simulate server latency with 2 second delay
        //     setTimeout(() => resolve(HEROES), 2000);
        // });
        return this.http.get(this.heroesUrl).toPromise()
            .then((response) => { return response.json().data as Array<Hero>; })
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Hero> {
        // return this.getHeroes()
        //     .then((heroes) => heroes.find((hero) => { return hero.id === id; }));
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url).toPromise()
            .then((response) => { return response.json().data as Hero; })
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<any> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then((result) => { return result.json().data as Hero; })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}