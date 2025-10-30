import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../../services/client.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './cliente-dialog.html',
  styleUrls: ['./cliente-dialog.css']
})
export class ClientDialogComponent {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ClientDialogComponent>
  ) {
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      clientNickname: [''],
      phoneNumber: ['', Validators.required],
      clientDebts: ['0']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = new FormData();

    // Garante que todos os campos sejam enviados como string
    Object.entries(this.form.value).forEach(([key, value]) => {
      formData.append(key, String(value ?? ''));
    });

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.clientService.createClient(formData).subscribe({
      next: (res) => {
        console.log('Cliente cadastrado com sucesso:', res);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente:', err);
      }
    });
  }
}
