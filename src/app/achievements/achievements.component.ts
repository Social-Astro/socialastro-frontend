import { Component } from '@angular/core';
import { AchievementsFormsComponent } from './achievements-forms/achievements-forms.component';
import { AchievementsListComponent } from './achievements-list/achievements-list.component';

@Component({
    selector: 'achievements',
    standalone: true,
    imports: [AchievementsFormsComponent, AchievementsListComponent],
    templateUrl: './achievements.component.html',
    styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {}
