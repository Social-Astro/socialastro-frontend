import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../home/interfaces/post';

@Component({
    selector: 'profile-posts',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './profile-posts.component.html',
    styleUrl: './profile-posts.component.scss'
})
export class ProfilePostsComponent {
    posts = input.required<Post[]>();
}
