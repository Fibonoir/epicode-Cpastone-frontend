import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styles: ``
})
export class InputComponent {
    @Input() placeholder: string = ''

    @Input() id: string = ''

    @Input() type: string= 'text'

    @Input() customClass: string = ''

    @Input() value: string = ''

    @Input() valueChange = new EventEmitter<string>()

    handleInput(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value
        this.valueChange.emit(inputValue)
    }
}
