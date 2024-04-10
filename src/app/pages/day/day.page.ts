import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DayPage implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.year = this.router.snapshot.params['year'];
    this.currentMonth = this.router.snapshot.params['currentMonth'];
    this.dayNumber = this.router.snapshot.params['dayNumber'];
    let data = {
      year: this.year,
      currentMonth: this.currentMonth,
      dayNumber: this.dayNumber
    };
    this.api.getDay(data).subscribe((resp) => {
      this.week = resp;
      console.log(this.week);
    });
  }

  year: any;
  currentMonth: any;
  dayNumber: any;

  week: any;

}
