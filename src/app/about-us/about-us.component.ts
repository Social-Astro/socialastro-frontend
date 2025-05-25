import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'about-us',
    imports: [RouterLink],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
    emojiArray = Array.from({ length: 200 });
}
