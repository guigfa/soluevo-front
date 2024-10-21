import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColor, ButtonFontSize, ButtonRadius, ButtonSpacing } from './button.type';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input({ required: true }) label!: string;
    @Input({ required: true }) color!: ButtonColor;
    @Input({ required: true }) fontSize!: ButtonFontSize;
    @Input({ required: true }) radius!: ButtonRadius;
    @Input({ required: true }) spacing!: ButtonSpacing;
    @Output() handleClick = new EventEmitter<any>();
}
