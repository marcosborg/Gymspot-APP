import { Component } from '@angular/core';
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
  IonButton,
  ActionSheetController,
  IonFooter,
  LoadingController,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PreferencesService } from 'src/app/services/preferences.service';
import { Router } from '@angular/router';

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
    IonButton,
    IonFooter,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class CartPage {

  constructor(
    private preferences: PreferencesService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  selectedSlots: any = [];
  access_token: any;

  ionViewWillEnter() {
    this.loadingController.create().then((loading) => {
      loading.present();
      this.preferences.checkName('access_token').then((resp: any) => {
        this.access_token = resp.value;
        this.preferences.checkName('selected_slots').then((resp: any) => {
          this.selectedSlots = JSON.parse(resp.value);
        });
      });
    });
  }

  removeFromCart(index: number) {
    this.selectedSlots.splice(index, 1);
    this.preferences.setName('selected_slots', JSON.stringify(this.selectedSlots));
  }

  deleteCart() {
    this.actionSheetController.create({
      header: 'Eliminar carrinho',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.preferences.removeName('selected_slots').then(() => {
              this.router.navigateByUrl('/tabs/tab1');
            });
          }
        }
      ]
    }).then((action) => {
      action.present();
    });
  }

  pay() {
    if (this.access_token) {
      //PAGAR
    } else {
      //IR PARA LOGIN
    }
  }

}
