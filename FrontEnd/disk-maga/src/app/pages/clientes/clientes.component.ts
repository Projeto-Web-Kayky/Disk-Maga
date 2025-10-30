import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from './cliente-dialog/cliente-dialog';
import { ClientService } from '../../services/client.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export interface Client {
  clientId: number;
  clientName: string;
  clientNickname: string;
  phoneNumber: string;
  clientDebts: number;
  fotoPath: string | null;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, ClientDialogComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  private dialog = inject(MatDialog);
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);
  private clientService = inject(ClientService);

  clients: Client[] = [];
  backendUrl = 'http://localhost:8080/'; // ajuste conforme seu backend

  constructor() {
    const plusIcon = 'assets/icons/plus.svg';
    this.iconRegistry.addSvgIcon('plus', this.sanitizer.bypassSecurityTrustResourceUrl(plusIcon));
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (res: any) => {
        this.clients = res.data || [];
      },
      error: (err) => console.error('Erro ao buscar clientes:', err)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '400px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadClients(); // recarrega a lista após cadastro
      }
    });
  }
}
