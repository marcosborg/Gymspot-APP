import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonContent, IonHeader, IonImg, IonLabel, IonList, IonMenu, IonRouterOutlet, IonSplitPane, IonToolbar, MenuController } from '@ionic/angular/standalone';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonMenu, IonSplitPane, RouterLink, RouterLinkActive, IonContent, IonList, IonLabel, CommonModule, IonImg, IonHeader, IonToolbar],
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    private menu: MenuController,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.menu.close();
    });
    this.api.getMenus().subscribe((resp: any) => {
      this.menus = resp.data;
    });
  }

  menus: any = [];

}
