import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule, FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
    
  ) {
    this.initializeForm();
   }

   loginForm!: FormGroup;
   private initializeForm(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
   }

   submitLogin(): void {
    const formValue = this.loginForm.value;

    this.loginService.login(formValue.login, formValue.password).subscribe({
      next: (response) => {
        if (response.status === 'OK') {
          // this.router.navigate(['/login']);
          console.log('Login bem-sucedido');
        }
        this.snackBar.open('Usuário Logado com Sucesso!', 'Fechar', { duration: 3000 });
      },
      error: (error) => {
        console.error('Credenciais inválidas', error);
        this.snackBar.open('Credenciais inválidas!', 'Fechar', { duration: 3000 });
      }
    });
   }

   hide = signal(true);
    clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
