import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-spots',
  templateUrl: './spots.page.html',
  styleUrls: ['./spots.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    HeaderComponent,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    RouterLink
  ]
})
export class SpotsPage implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getSpots().subscribe((resp: any) => {
      this.spots = resp.data;
    });
  }

  spots: any = [];

}
