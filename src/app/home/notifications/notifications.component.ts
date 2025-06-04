import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Notification } from '../interfaces/notification';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { quotes } from '../interfaces/spacial-quotes';

@Component({
  selector: 'notifications',
  standalone: true,
  imports: [RouterLink, Avatar],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  readonly #notificationsService = inject(NotificationsService);
  readonly #destroyRef = inject(DestroyRef);

  notifications = signal<Notification[]>([]);
  quotes = quotes;

  constructor() {
    this.getNotifications();
  }

  getNotifications() {
    this.#notificationsService.getAll()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (resp) => {
          this.notifications.set(resp);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      })
  }

}
