import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

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
export class SpotPage implements OnInit {

  spot: any;
  spot_id: any;
  month: any;
  isModalOpen: any = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.spot_id = this.route.snapshot.params['spot_id'];
    this.api.getSpot(this.spot_id).subscribe((resp: any) => {
      this.spot = resp.data;
      console.log(resp.data);
    });
    this.api.getMonth().subscribe((resp: any) => {
      this.month = resp;
      console.log(this.month);
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
