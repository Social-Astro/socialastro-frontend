import { Component, Input } from '@angular/core';

@Component({
    selector: 'profile-posts',
    standalone: true,
    imports: [],
    templateUrl: './profile-posts.component.html',
    styleUrl: './profile-posts.component.scss'
})
export class ProfilePostsComponent {
    @Input({ required: true }) posts: any[] = [];
}
