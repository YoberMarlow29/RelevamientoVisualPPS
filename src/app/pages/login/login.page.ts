import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonCol, IonGrid, IonRow, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText, IonRow, IonGrid, IonCol, IonButton, IonLabel,
    IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule]
})
export class LoginPage {

  protected email: string = '';
  protected password: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  async btnLogin() {
    try {
      const userCredential = await this.auth.login(this.email, this.password);
      console.log(userCredential);
      console.log("Inicio de sesión exitoso");
      this.router.navigate(['home']);
      this.email = '';  // Limpiar campo de correo electrónico
      this.password = '';  // Limpiar campo de contraseña
    } catch (error) {
      console.log("Error al iniciar sesión", error);
    }
  }

  btnUsuarioUno() {
    this.email = "admin@admin.com";
    this.password = "111111";
  }

  btnUsuarioDos() {
    this.email = "invitado@invitado.com";
    this.password = "222222";
  }

  btnUsuarioTres() {
    this.email = "usuario@usuario.com";
    this.password = "333333";
  }
}
