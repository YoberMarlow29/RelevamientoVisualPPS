import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonButton, IonContent,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class HomePage  {

  constructor(private auth:AuthService, private router : Router) { }


  btnSalir() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log('Error al cerrar sesión:', error);
    });
  }
}
