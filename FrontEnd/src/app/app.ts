import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Homepage } from "./components/homepage/homepage";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  imports: [RouterOutlet, Homepage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
