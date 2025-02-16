import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styles: ``
})
export class SwitchComponent {
    @Input() checked: boolean = false;
    @Input() label: string = 'Airplane mode';
    @Output() checkedChange = new EventEmitter<boolean>();

    toggle() {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
