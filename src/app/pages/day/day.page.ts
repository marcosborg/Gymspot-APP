import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonThumbnail, IonNote, IonList, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonLabel,
    IonThumbnail,
    IonNote,
    IonList,
    IonButton,
    IonIcon
  ]
})
export class DayPage implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private api: ApiService
  ) {
    addIcons({ chevronBackOutline, chevronForwardOutline })
  }

  ngOnInit() {
    this.spot_id = this.router.snapshot.params['spot_id'];
    this.year = this.router.snapshot.params['year'];
    this.currentMonth = this.router.snapshot.params['currentMonth'];
    this.dayNumber = this.router.snapshot.params['dayNumber'];
    let data = {
      spot_id: this.spot_id,
      year: this.year,
      currentMonth: this.currentMonth,
      dayNumber: this.dayNumber
    };
    this.api.getDay(data).subscribe((resp) => {
      this.day = resp;
      console.log(this.day);
    });
  }

  spot_id: any;
  year: any;
  currentMonth: any;
  dayNumber: any;

  day: any;

  pastDay() {
    let data = {
      spot_id: this.spot_id,
      year: this.day.pastDay.year,
      currentMonth: this.day.pastDay.currentMonth,
      dayNumber: this.day.pastDay.dayNumber
    };
    this.api.getDay(data).subscribe((resp) => {
      this.day = resp;
    });
  }

  nextDay() {
    let data = {
      spot_id: this.spot_id,
      year: this.day.nextDay.year,
      currentMonth: this.day.nextDay.currentMonth,
      dayNumber: this.day.nextDay.dayNumber
    };
    this.api.getDay(data).subscribe((resp) => {
      this.day = resp;
    });
  }

}
