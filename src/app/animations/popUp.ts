import {
    trigger,
    transition,
    style,
    animate,
} from '@angular/animations';

export const popUp = trigger('popUp', [
    transition(':enter', [
        style({ opacity: 0}),
        animate(
            '300ms ease-in-out',
            style({ opacity: 1 })
        ),
    ]),
]);
