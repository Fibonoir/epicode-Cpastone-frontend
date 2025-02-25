import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-validation-message',
    imports: [CommonModule],
    templateUrl: './validation-message.component.html',
    styles: ``,
})
export class ValidationMessageComponent {
    @Input() control!: AbstractControl | null;
    @Input() customMessages: { [key: string]: string } = {};
    @Input() isInvalid: boolean = false

    defaultMessages: { [key: string]: string } = {
        required: 'This field is required.',
        minlength: 'The value is too short.',
        maxlength: 'The value is too long.',
        email: 'Enter a valid email.',
        pattern: 'Invalid format.',
    };

    get errorMessage(): string | null {
        if (
            this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched || this.isInvalid)
        ) {
            const errors = this.control.errors;
            const firstKey = Object.keys(errors)[0];

            return (
                this.customMessages[firstKey] ||
                this.defaultMessages[firstKey] ||
                'Invalid field'
            );
        }
        return null;
    }
}
