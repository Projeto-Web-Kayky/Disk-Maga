import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-bar',
  imports: [MatIconModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent{
  @Input() pageTitle: string = '';

  constructor(private location:Location){}

  logout(){
    this.location.back();
  }
}
