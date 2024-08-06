import { Component, OnInit } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PreferencesService } from 'src/app/services/preferences.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
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
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class CartPage implements OnInit {

  constructor(
    private preferences: PreferencesService
  ) { }

  selectedSlots: any = [];

  ngOnInit() {
    this.preferences.checkName('selected_slots').then((resp: any) => {
      this.selectedSlots = JSON.parse(resp.value);
      console.log(this.selectedSlots);
    });
  }

  removeFromCart(index: number) {
    this.selectedSlots.splice(index, 1);
    this.preferences.setName('selected_slots', JSON.stringify(this.selectedSlots));
  }

}
