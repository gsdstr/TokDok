import { Component, HostBinding, enableProdMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScreenService, AppInfoService } from './shared/services';
import { FooterComponent } from './shared/components';
import { SideNavOuterToolbarComponent } from './layouts';
import { UnauthenticatedContentModule } from './unauthenticated-content';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent, SideNavOuterToolbarComponent, UnauthenticatedContentModule, RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private screen: ScreenService, public appInfo: AppInfoService) { }

}
