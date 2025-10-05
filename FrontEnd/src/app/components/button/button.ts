import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() description: string = '';
  @Input() classes: string = 'inputButton homepageButton';

  criarInput(description: string, classes: string) {
    this.description = description;
    this.classes = classes;
  }
}
