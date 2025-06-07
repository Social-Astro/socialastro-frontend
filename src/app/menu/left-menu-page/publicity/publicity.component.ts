import { Component, OnInit, signal } from '@angular/core';

@Component({
    selector: 'app-publicity',
    standalone: true,
    templateUrl: './publicity.component.html',
    styleUrl: './publicity.component.scss'
})
export class PublicityComponent implements OnInit {
    images = [
        { src: 'assets/publicity/walla-dona.svg', title: 'Walla-dona' },
        { src: 'assets/publicity/ShowDAW.gif', title: 'ShowDAW' }
    ];
    currentIndex = signal(0);

    get currentImage() {
        return this.images[this.currentIndex()];
    }

    ngOnInit(): void {
        setInterval(() => {
            this.currentIndex.set((this.currentIndex() + 1) % this.images.length);
        }, 10000);
    }
}
