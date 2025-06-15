import { Component, input } from '@angular/core';

@Component({
    selector: 'profile-achievements',
    standalone: true,
    imports: [],
    templateUrl: './profile-achievements.component.html',
    styleUrl: './profile-achievements.component.scss'
})
export class ProfileAchievementsComponent {
    ach = input.required<any>();
}
