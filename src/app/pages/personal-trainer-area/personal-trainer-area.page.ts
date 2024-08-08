import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  LoadingController,
  IonThumbnail,
  IonLabel,
  IonButton,
  IonIcon,
  IonModal,
  IonButtons,
  AlertController,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-personal-trainer-area',
  templateUrl: './personal-trainer-area.page.html',
  styleUrls: ['./personal-trainer-area.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonIcon,
    IonModal,
    IonButtons,
  ]
})
export class PersonalTrainerAreaPage {

  constructor(
    private api: ApiService,
    private loadingController: LoadingController,
    private preferences: PreferencesService,
    private alertController: AlertController
  ) {
    addIcons({ cameraOutline });
  }

  access_token: any;
  spots: any = [];
  user: any;
  personal_trainer: any;
  isModalOpen = false;

  ionViewWillEnter() {
    this.inicialize();
  }

  inicialize() {
    this.loadingController.create().then((loading) => {
      loading.present();
      this.api.getSpots().subscribe((resp: any) => {
        this.spots = resp.data;
        this.preferences.checkName('access_token').then((resp: any) => {
          this.access_token = resp.value;
          let data = {
            access_token: this.access_token
          }
          this.api.user(data).subscribe((resp: any) => {
            loading.dismiss();
            this.user = resp;
            if (this.user.personal_trainer) {
              this.personal_trainer = this.user.personal_trainer;
              let spots = this.personal_trainer.spots;
              let spotsArray: any = [];
              spots.forEach((element: any) => {
                spotsArray.push(element.id);
              });
              this.personal_trainer.spots = spotsArray;
            } else {
              this.personal_trainer = {
                name: this.user.name,
                email: this.user.email,
                phone: "",
                facebook: "",
                instagram: "",
                linkedin: "",
                tiktok: "",
                description: "",
                price: "",
                professional_certificate: "",
                spots: [],
                expiration: "",
                certificate_type: "",
                user_id: this.user.id,
              }
            }
          });
        });
      });
    });
  }

  updateProfessionalData() {
    this.loadingController.create().then((loading) => {
      loading.present();
      let data = {
        access_token: this.access_token,
        personal_trainer: this.personal_trainer
      }
      this.api.updateProfessionalData(data).subscribe((resp: any) => {
        loading.dismiss();
        this.inicialize();
        if (resp.photos.lenght == 0) {
          this.isModalOpen = true;
        }
      }, (err) => {
        console.log(err);
        loading.dismiss();
        let errors = err.error.errors;
        let errorMessages = '';
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            errors[field].forEach((message: string) => {
              errorMessages += `${message}. `;
            });
          }
        }
        this.alertController.create({
          header: 'Erro de validação',
          message: errorMessages,
          buttons: [
            {
              text: 'Tentar novamente',
              role: 'cancel'
            }
          ]
        }).then((alert) => {
          alert.present();
        });
      });
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onWillDismiss() {
    this.inicialize();
  }

}
