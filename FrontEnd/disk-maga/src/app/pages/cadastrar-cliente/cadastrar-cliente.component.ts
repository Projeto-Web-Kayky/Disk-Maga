import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ImagemCliente } from '../../components/imagem-cliente/imagem-cliente.component';

const MODULES = [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule]
const COMPONENTS = [TopBarComponent, ImagemCliente]
@Component({
  selector: 'app-cadastrar-cliente',
  imports: [MODULES, COMPONENTS],
  templateUrl: './cadastrar-cliente.component.html',
  styleUrl: './cadastrar-cliente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastrarCliente {

}
