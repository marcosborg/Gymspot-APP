import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, LoadingController, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonThumbnail, IonNote, IonList, IonButton, IonIcon, IonFab, IonFabButton, IonModal, IonButtons, IonImg } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, cartOutline } from 'ionicons/icons';

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
    IonIcon,
    IonFab,
    IonFabButton,
    IonModal,
    IonButtons,
    IonImg
  ]
})
export class DayPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ chevronBackOutline, chevronForwardOutline, cartOutline })
  }

  ngOnInit() {
    this.spot_id = this.route.snapshot.params['spot_id'];
    this.year = this.route.snapshot.params['year'];
    this.currentMonth = this.route.snapshot.params['currentMonth'];
    this.dayNumber = this.route.snapshot.params['dayNumber'];
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

  selectedSlots: any[] = [];
  isModalOpen = false;

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

  selectSlot(slot: any) {
    const index = this.selectedSlots.findIndex(selectedSlot => selectedSlot === slot);
    if (index > -1) {
      this.selectedSlots.splice(index, 1);
    } else {
      this.selectedSlots.push(slot);
    }
    console.log(this.selectedSlots);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  pay(type: string) {
    this.loadingController.create().then((loading) => {
      loading.present();
      setTimeout(() => {
        loading.dismiss();
        let code = this.generateSixDigitCode();
        this.alertController.create({
          header: 'Pagamento concluido',
          subHeader: 'Aqui tem o código de acesso ao SPOT',
          message: 'O código de acesso é: ' + code + '. O mesmo pode ser novamente obtido na área de reservas no menu inferior da APP.',
          buttons: [
            {
              text: 'Continuar',
              handler: () => {
                this.isModalOpen = false;
                setTimeout(() => {
                  this.router.navigateByUrl('tabs/tab2', { replaceUrl: true });
                }, 500);
              }
            },
            {
              text: 'Solicitar um PT',
              handler: () => {
                this.isModalOpen = false;
                setTimeout(() => {
                  this.router.navigateByUrl('/pts', { replaceUrl: true });
                }, 500);
              }
            }
          ]
        }).then((alert) => {
          alert.present();
        })
      }, 3000);
    });
  }

  generateSixDigitCode() {
    let randomNumber = Math.floor(Math.random() * 1000000);
    let sixDigitCode = String(randomNumber).padStart(6, '0');
    return sixDigitCode;
  }  

}
