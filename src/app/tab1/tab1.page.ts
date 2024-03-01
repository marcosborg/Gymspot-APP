import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page implements OnInit {
  constructor(
    private api: ApiService,
  ) { }

  sliders: any = [];
  steps: any = [];

  ngOnInit() {
    this.api.getSliders().subscribe((resp: any) => {
      this.sliders = resp.data;
      this.api.getSteps().subscribe((resp: any) => {
        this.steps = resp.data;
      });
    });
  }

}
