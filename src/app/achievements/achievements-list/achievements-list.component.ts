import { Component, inject, OnInit, signal } from '@angular/core';
import { AchievementService } from '../services/achievements.service';

@Component({
    selector: 'app-achievements-list',
    standalone: true,
    templateUrl: './achievements-list.component.html',
    styleUrl: './achievements-list.component.scss'
})
export class AchievementsListComponent implements OnInit {
    achievements = signal<any[]>([]);
    isLoading = signal(true);
    error = signal<string | null>(null);

    #achievementService = inject(AchievementService);

    ngOnInit() {
        this.loadAchievements();
    }

    loadAchievements() {
        this.isLoading.set(true);
        this.error.set(null);
        this.#achievementService.getAll().subscribe({
            next: (data) => {
                this.achievements.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Error al cargar los achievements.');
                this.isLoading.set(false);
            }
        });
    }
}
