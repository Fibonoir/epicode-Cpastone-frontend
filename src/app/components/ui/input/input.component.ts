import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input',
    imports: [CommonModule],
    templateUrl: './input.component.html',
    styles: [``],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements ControlValueAccessor {
    @Input() placeholder: string = '';
    @Input() id: string = '';
    @Input() type: string = 'text';
    @Input() customClass: string = '';

    value: string = '';

    onChange: (value: string) => void = () => {};
    onTouched: () => void = () => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {}

    handleInput(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value;
        this.value = inputValue;
        this.onChange(inputValue);
    }
}
