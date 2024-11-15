import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from 'src/config/routes.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  // Credentials object bound to the form
  credentials = {
    email: '',
    password: '',
  };

  /**
   * Handles the login process.
   * Submits the form and processes the authentication.
   */
  login() {
    if (!this.credentials.email || !this.credentials.password) {
      this.toastr.error('Veuillez remplir tous les champs.');
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.toastr.success('Bienvenue chez vous :)');
        this.router.navigate([APP_ROUTES.cv]); // Adjust route as needed
      },
      error: () => {
        this.toastr.error('Veuillez vérifier vos credentials');
      },
    });
  }
}
