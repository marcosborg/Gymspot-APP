import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, HeaderComponent]
})
export class LocationPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  location_id: any;

  ngOnInit() {
    this.location_id = this.route.snapshot.params['location_id'];
    this.api.getLocation(this.location_id).subscribe((resp: any) => {
      console.log(resp);
    });
  }

}
