import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './main/components/navigation/toolbar/toolbar.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'soluevo';

  constructor() {
    registerLocaleData(localePt);
  }
}
