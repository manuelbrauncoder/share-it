import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  uiService = inject(UiService);

  toggleSidebar() {
    this.uiService.isSidebarPresented = !this.uiService.isSidebarPresented;
  }
}
