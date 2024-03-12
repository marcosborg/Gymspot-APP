import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonModal, ModalController, IonIcon } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { addCircleOutline, logoEuro, peopleOutline, personOutline } from 'ionicons/icons';

register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    HeaderComponent,
    IonModal,
    IonIcon,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page implements OnInit {
  constructor(
    private api: ApiService,
    public modal: ModalController
  ) {
    addIcons({
      personOutline,
      peopleOutline,
      addCircleOutline,
      logoEuro
    });
  }

  sliders: any = [];
  abouts: any = [];
  isModalOpen: any = false;
  text: string = '';
  image: string = '';
  services: any = [];
  galleries: any = [];
  locations: any = [];

  ngOnInit() {
    this.api.getSliders().subscribe((resp: any) => {
      this.sliders = resp.data;
    });
    this.api.getAbouts().subscribe((resp: any) => {
      this.abouts = resp.data;
    });
    this.api.getServices().subscribe((resp: any) => {
      this.services = resp.data;
    });
    this.api.getGalleries().subscribe((resp: any) => {
      this.galleries = resp.data;
    });
    this.api.getLocations().subscribe((resp: any) => {
      this.locations = resp.data;
    });
  }

  showAbout(text: string, image: string) {
    this.isModalOpen = !this.isModalOpen;
    this.text = text;
    this.image = image;
  }

  cancel() {
    this.isModalOpen = false;
  }

}
