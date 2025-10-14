import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent{
  @Input() pageTitle: string = '';

  constructor(private location:Location){}

  goBack(){
    this.location.back();
  }
}
export class TopBar {

}
