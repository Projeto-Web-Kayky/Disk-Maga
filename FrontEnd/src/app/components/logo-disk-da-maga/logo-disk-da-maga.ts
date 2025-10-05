import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-disk-da-maga',
  imports: [],
  templateUrl: './logo-disk-da-maga.html',
  styleUrl: './logo-disk-da-maga.css'
})
export class LogoDiskDaMaga {
  @Input() classes: string = 'homepageLogo';

  criarLogo(classes: string) {
    this.classes = classes;
  }
}
