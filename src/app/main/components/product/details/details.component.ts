import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Review } from '../../../../shared/models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { Specification } from '../../../../shared/models/specification';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @Input({ required: true }) images!: string[];
  @Input({ required: true }) longDescription!: string;
  @Input({ required: true }) reviews!: Review[];
  @Input({ required: true }) specifications!: Specification[];
  @Input({ required: true }) additionalInformation!: string;
  
  private destroy = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  
  protected Math = Math;
  protected stars: number[] = Array(5).fill(0);
  protected selectedSection = 'description';
  protected sections = [{label: 'Descrição', param: 'description'}, {label: 'Informações adicionais', param: 'additional'}];

  ngOnInit(): void {
    this._getParams();
    this.sections.push({label: `Reviews [${this.reviews.length}]`, param: 'reviews'});
  }

  private _getParams() {
    this.activatedRoute.params
        .pipe(
          takeUntilDestroyed(this.destroy)
        )  
        .subscribe(params => {
          this.selectedSection = params['section']; 
      });
  }

  protected redirect(section: string) {
    this.selectedSection = section;
    this.router.navigate(['/product', this.activatedRoute.snapshot.params['id'], section]);
  };

}
