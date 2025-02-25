import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styles: ``
})
export class ToastComponent {
    @Input() message: string = 'Notification';

  }
