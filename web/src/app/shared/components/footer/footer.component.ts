import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer><ng-content></ng-content></footer>
  `,
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

}
