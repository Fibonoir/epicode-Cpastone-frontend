import { Component } from '@angular/core';
import { InputComponent } from '../../ui/input/input.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImageUploadComponent } from "../../ui/image-upload/image-upload.component";

@Component({
    selector: 'app-ad-form',
    imports: [InputComponent, CommonModule, ImageUploadComponent],
    templateUrl: './ad-form.component.html',
    styles: ``,
})
export class AdFormComponent {

}
