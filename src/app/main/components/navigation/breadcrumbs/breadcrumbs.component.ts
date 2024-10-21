import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Breadcrumb } from '../../../../shared/models/breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  @Input({ required: true }) breadcrumbs!: Breadcrumb[];
}
