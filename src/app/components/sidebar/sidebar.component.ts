import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  uiService = inject(UiService);
  authService = inject(AuthenticationService);

  closeAndRedirect(path: string) {
    this.uiService.isSidebarPresented = false;
    setTimeout(() => {
      this.uiService.redirectTo(path);
    }, 500);
  }

  logout() {
    this.authService.logout();
  }
}
