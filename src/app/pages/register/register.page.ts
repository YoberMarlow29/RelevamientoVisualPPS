import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/clases/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage  {

  users: User[] = [
    { id: '1', nombre: 'Maxi', email: 'admin@admin.com', password: '111111', perfil: 'admin', sexo: 'femenino' },
    { id: '2', nombre: 'David', email: 'invitado@invitado.com', password: '222222', perfil: 'invitado', sexo: 'femenino' },
    { id: '3', nombre: 'Leandro', email: 'usuario@usuario.com', password: '333333', perfil: 'usuario', sexo: 'masculino' },
    { id: '4', nombre: 'Luca', email: 'anonimo@anonimo.com', password: '444444', perfil: 'usuario', sexo: 'masculino' },
    { id: '5', nombre: 'Sergio', email: 'tester@tester.com', password: '555555', perfil: 'tester', sexo: 'femenino' }
  ];

  constructor(private authService: AuthService) {}

  registerAllUsers() {
    // this.authService.registerMultipleUsers(this.users).subscribe(
    //   () => {
    //     console.log('registro exitoso');
    //   },
    //   error => {
    //     console.error('Error during registration:', error);
    //   }
    // );
  }
}
