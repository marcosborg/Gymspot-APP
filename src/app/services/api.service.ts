import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  //url: string = 'https://gymspot.pt/api/v2/';
  //protected_url: string = 'https://gymspot.pt/api/v1/';
  url: string = 'http://127.0.0.1:8000/api/v2/';
  protected_url: string = 'http://127.0.0.1:8000/api/v1/';

  getSliders() {
    return this.http.get(this.url + 'sliders');
  }

  getSteps() {
    return this.http.get(this.url + 'steps');
  }

  getMenus() {
    return this.http.get(this.url + 'menus');
  }

  getContentPage(content_page_id: any) {
    return this.http.get(this.url + 'content-pages/' + content_page_id);
  }

  getAbouts() {
    return this.http.get(this.url + 'abouts');
  }

  getServices() {
    return this.http.get(this.url + 'services');
  }

  getGalleries() {
    return this.http.get(this.url + 'galleries');
  }

  getLocations() {
    return this.http.get(this.url + 'locations');
  }

  getLocation(location_id: any) {
    return this.http.get(this.url + 'locations/' + location_id);
  }

  getFaqs() {
    return this.http.get(this.url + 'faq-questions');
  }
}
