import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonThumbnail, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline, arrowBackOutline, barChartOutline, cameraOutline, checkmarkCircleSharp } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
  standalone: true,
  imports: [IonIcon, IonSpinner, IonLabel, IonItem, IonList, IonButton, IonContent,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonThumbnail, RouterLink]
})
export class CosasLindasPage implements OnInit {
  photos: any[] = [];
  user: any = null;
  isLoading = true; // Estado de carga inicial

  constructor(
    private photoService: PhotoService,
    private authService: AuthService,
    private firestore: FirestoreService,
  ) {
    addIcons({ checkmarkCircleSharp, arrowBackOutline, cameraOutline, barChartOutline });
  }

  async ngOnInit(): Promise<void> {
    this.user = await firstValueFrom(this.authService.getUserLogged());
    if (this.user) {
      this.loadPhotos();
    }
  }

  loadPhotos(): void {
    if (!this.user) {
      console.log('No user is logged in');
      return;
    }

    this.isLoading = true; // Iniciar carga
    this.firestore.obtenerCosasLindas().subscribe(photos => {
      this.photos = photos;
      this.isLoading = false; // Finalizar carga
    });
  }

  async takePhoto(): Promise<void> {
    if (!this.user) {
      console.log('No user is logged in');
      return;
    }

    this.isLoading = true; // Iniciar carga
    try {
      const email = this.user.email;
      const userDetails = await firstValueFrom(this.firestore.obtenerUsuarioPorEmail(email));

      if (userDetails) {
        const photo = {
          likes: [],
          email: email,
          nombre: userDetails.nombre,
          hora: new Date().getTime(),
        };

        await this.photoService.agregarNuevaFotoAGaleria(photo, 1);
        this.loadPhotos();
      } else {
        console.log('User not found');
        this.isLoading = false; // Finalizar carga si ocurre un error
      }
    } catch (error) {
      console.log('Error al agregar nueva foto a la galería:', error);
      this.isLoading = false; // Finalizar carga si ocurre un error
    }
  }

  async vote(photo: any): Promise<void> {
    if (!this.user) {
      console.log('No user is logged in');
      return;
    }

    const userId = this.user.uid;
    const likes = photo.likes || [];

    if (!likes.includes(userId)) {
      likes.push(userId);
      await this.firestore.agregarVoto(photo.id, userId, "cosasLindas");
    } else {
      const index = likes.indexOf(userId);
      if (index > -1) {
        likes.splice(index, 1);
        await this.firestore.quitarVoto(photo.id, userId, "cosasLindas");
      }
    }

    photo.likes = likes;
    await this.firestore.actualizarFotosLindas(photo, photo.id, 1);
    this.loadPhotos();
  }
}
