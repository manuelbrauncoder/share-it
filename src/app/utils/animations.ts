import { animate, style, transition, trigger } from '@angular/animations';

export const slideFromTop = trigger('slideFromTop', [
  transition(':enter', [
    style({ transform: 'translate(-50%, -200%)' }),
    animate('0.2s ease-out', style({ transform: 'translate(-50%, 0)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translate(-50%, 0)' }),
    animate('0.2s ease-out', style({ transform: 'translate(-50%, -200%)' })),
  ]),
]);

export const slideFromBottom = trigger('slideFromBottom', [
  transition(':enter', [
    style({ transform: 'translate(-50%, 200%)' }),
    animate('0.2s ease-out', style({ transform: 'translate(-50%, 0)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translate(-50%, 0)' }),
    animate('0.2s ease-out', style({ transform: 'translate(-50%, 200%)' })),
  ]),
]);
