import { Injectable } from '@angular/core';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FirestoreService } from './firestore.service';
import { firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private usuario: any;

  constructor(
    private authService: AuthService,
    private angularFirestorage: AngularFireStorage,
    private firestoreService: FirestoreService
  ) {
    this.initializeUser();
  }

  private async initializeUser() {
    this.usuario = await firstValueFrom(this.authService.getUserLogged());
  }

  async agregarNuevaFotoAGaleria(foto: any, type: number) {
    if (!this.usuario) {
      console.log('Usuario no está inicializado.');
      return;
    }

    try {
      const fotoCapturada = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
        webUseInput: true,
      });

      const storage = getStorage();
      const fecha = new Date().getTime();
      const nombreArchivo = `${this.usuario.email}-${fecha}`;
      const referenciaStorage = ref(storage, nombreArchivo);
      const url = this.angularFirestorage.ref(nombreArchivo);

      await uploadString(referenciaStorage, fotoCapturada.dataUrl, 'data_url');

      const downloadURL = await firstValueFrom(url.getDownloadURL());
      foto.rutaFoto = downloadURL;
      await this.firestoreService.agregarFoto(foto, type);

    } catch (error) {
      console.log('Error al agregar nueva foto a la galería:', error);
    }
  }
}
