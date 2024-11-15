import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { API } from '../../../config/api.config';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // Signals for authentication state
  private isAuthenticatedSignal = signal<boolean>(false);
  private userSignal = signal<{ id: string; email: string | null } | null>(null);

  // Computed signals
  isAuthenticated = computed(() => this.isAuthenticatedSignal());
  user = computed(() => this.userSignal());

  /**
   * Performs login and updates signals
   * @param credentials: CredentialsDto
   */
  login(credentials: CredentialsDto) {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        const { id, userId } = response;

        // Update local storage
        localStorage.setItem('token', id);
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('email', credentials.email);

        // Update signals
        this.isAuthenticatedSignal.set(true);
        this.userSignal.set({ id: userId.toString(), email: credentials.email });
      })
    );
  }

  /**
   * Loads authentication state on app startup
   */
  loadAuthState() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');

    if (token && userId) {
      this.isAuthenticatedSignal.set(true);
      this.userSignal.set({ id: userId, email });
    } else {
      this.isAuthenticatedSignal.set(false);
      this.userSignal.set(null);
    }
  }

  /**
   * Logs out the user and resets signals
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');

    this.isAuthenticatedSignal.set(false);
    this.userSignal.set(null);
  }
}
