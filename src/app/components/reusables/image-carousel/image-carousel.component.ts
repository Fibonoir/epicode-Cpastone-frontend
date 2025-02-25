import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface photo {
    secureUrl: string
    publicId: number
}

@Component({
    selector: 'app-image-carousel',
    imports: [CommonModule],
    templateUrl: './image-carousel.component.html',
    styles: ``,
})
export class ImageCarouselComponent {
    @Input() images: photo[]= [];
    @Input() carouselHeight: string = 'h-[280px] sm:h-[320px] md:h-[200px]'

    defaultImage: string =
        'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';

    currentIndex: number = 0;

    get currentImage(): string {
        return this.images && this.images.length > 0
            ? this.images[this.currentIndex].secureUrl
            : this.defaultImage;
    }

    nextImage(): void {
        if (this.images && this.images.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }
    }

    prevImage(): void {
        if (this.images && this.images.length > 0) {
            this.currentIndex =
                (this.currentIndex - 1 + this.images.length) %
                this.images.length;
        }
    }
}
