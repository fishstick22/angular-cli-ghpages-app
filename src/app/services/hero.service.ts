import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
// import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/toPromise';

import { Hero } from './../model/hero';

@Injectable()
export class HeroService {

  // private headers = new Headers({'Content-Type': 'application/json'});
  // http://chariotsolutions.com/blog/post/angular-2-spring-boot-jwt-cors_part1/
  private heroesUrl = ' http://localhost:8080/heroes';  // URL to web api
  // private heroesUrl = 'api/heroes';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl, {headers: this.headers})
               .toPromise()
               .then(response => response.json()._embedded.heroes as Hero[])
               .catch(this.handleError);
  }


  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
