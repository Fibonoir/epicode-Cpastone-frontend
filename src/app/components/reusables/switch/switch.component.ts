import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styles: ``
})
export class SwitchComponent {
    checked: boolean = false;
    label: string = 'Client View';
    @Output() checkedChange = new EventEmitter<boolean>();

    toggle() {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
