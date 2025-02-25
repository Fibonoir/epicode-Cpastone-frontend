import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeSlide } from '../../../animations/fadeslide';

@Component({
  selector: 'app-call-modal',
  imports: [CommonModule],
  templateUrl: './call-modal.component.html',
  animations: [fadeSlide],
  styles: ``
})
export class CallModalComponent {
    @Input() isOpen: boolean  = false
    @Output() close = new EventEmitter<void>()

    closeModal() {
        this.close.emit()
    }

}
