import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatSlideToggleChange  } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.sass']
})
export class ThemeSwitcherComponent {
 isDarkThemeActive = true;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  onChange(newValue: boolean): void {
    this.isDarkThemeActive = !newValue;
    if (!newValue) {
      this.document.body.classList.remove('dark-mode');
    } else {
      this.document.body.classList.add('dark-mode');
    }
  }
}
