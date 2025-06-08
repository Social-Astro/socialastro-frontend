import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'profile-friends',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './profile-friends.component.html',
    styleUrl: './profile-friends.component.scss'
})
export class ProfileFriendsComponent {
    friends = input<any[]>();

    constructor() {
        console.log(this.friends());
    }
}
