import { Component } from '@angular/core';
import { InputText } from '../input-text/input-text';
import { Footer } from '../footer/footer';
import { LogoDiskDaMaga } from '../logo-disk-da-maga/logo-disk-da-maga';
import { Button } from "../button/button";

@Component({
  selector: 'app-homepage',
  imports: [],
  imports: [InputText, Footer, LogoDiskDaMaga, Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {

}
