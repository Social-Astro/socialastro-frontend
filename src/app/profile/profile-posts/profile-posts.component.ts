import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostsCardComponent } from '../../home/posts/posts-card/posts-card.component';

@Component({
    selector: 'profile-posts',
    standalone: true,
    imports: [PostsCardComponent, RouterModule],
    templateUrl: './profile-posts.component.html',
    styleUrl: './profile-posts.component.scss'
})
export class ProfilePostsComponent {
    posts = input.required<any[]>();
}
