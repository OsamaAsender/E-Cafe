import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  template: `
    <div *ngIf="rating > 0; else notRated" class="star-container">
      <span *ngFor="let star of starArray">
        <i class="fa-solid fa-star star me-1"></i>
      </span>
      ({{ rating }}/5)
    </div>
    <ng-template #notRated>
      <i>Not rated yet.</i>
    </ng-template>
  `,
  styles: [
    `
      .star-container {
        display: flex;
        Justify-content: start;
      }
      .star {
        color: #ffa41c;
      }
    `,
  ],
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 0; // Example: 4
  starArray: number[] = []; // Example: [1,2,3,4]

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.starArray = Array.from({ length: this.rating }, (_, index) => index + 1);
    }
  }
}
