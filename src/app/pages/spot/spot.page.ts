import { Component, OnInit, ViewChild, ElementRef, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.page.html',
  styleUrls: ['./spot.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonImg
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpotPage implements OnInit, OnDestroy, AfterViewInit {
  spot: any;
  spot_id: any;
  private subscription: Subscription = new Subscription();
  private apiKey: any = 'AIzaSyDJB5N4Q6uRpe6eD60tTDv1xSy5XGAwJIg';
  
  @ViewChild('map', { static: false }) private mapElementRef!: ElementRef;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.spot_id = this.route.snapshot.params['spot_id'];
    this.subscription.add(this.api.getSpot(this.spot_id).subscribe((resp: any) => {
      this.spot = resp.data;
      if (this.spot) {
        console.log(this.spot);
      } else {
        console.error('Spot data is undefined.');
      }
    }));
  }

  ngAfterViewInit() {
    // Ensuring the DOM element is available before initializing the map
    if (this.mapElementRef?.nativeElement) {
      this.initializeMap();
    } else {
      console.error('Map element is not available yet.');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeMap() {
    // Further check to ensure mapElementRef.nativeElement is not undefined
    if (this.mapElementRef?.nativeElement) {
      const newMap = GoogleMap.create({
        id: 'my-map',
        element: this.mapElementRef.nativeElement,
        apiKey: this.apiKey,
        config: {
          center: {
            lat: 33.6,
            lng: -117.9,
          },
          zoom: 8,
        },
      });
    }
  }
}
