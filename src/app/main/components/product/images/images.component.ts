import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent implements OnInit, OnChanges {
    @Input({ required: true }) images!: string[];
    @Input({ required: true }) promotion!: number;
    @Input({ required: true }) isNew!: boolean;
    protected currentImage!: string;

    ngOnInit(): void {
        this.currentImage = this.images[0];
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['images'].currentValue !== changes['images'].previousValue) {
            this.currentImage = this.images[0];
        }
    }

    protected changeImage(image: string) {
        this.currentImage = image;
    }
}
