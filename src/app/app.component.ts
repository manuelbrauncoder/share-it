import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { UiService } from './services/ui.service';
import { ToastComponent } from './components/toast/toast.component';
import { slideFromTop } from "./utils/animations";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, ToastComponent],
  animations: [slideFromTop],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'share-it';

  uiService = inject(UiService);

  constructor() {
    
  }
}
