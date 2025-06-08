import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Notification } from '../interfaces/notification';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { FriendService } from '../../profile/services/friend.service';
import { CreateRelation, FriendsByUser } from '../../interfaces/user';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'notifications',
  standalone: true,
  imports: [RouterLink, Avatar],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  readonly #notificationsService = inject(NotificationsService);
  readonly #friendsService = inject(FriendService);
  private readonly authService = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);

  currentUser = this.authService.currentUser.value();
  friends = signal<FriendsByUser[]>([]);

  notifications = signal<Notification[]>([]);

  constructor() {
    this.getNotifications();
    this.setFriends();
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

  setFriends() {
    let sub: any;
    sub = this.#friendsService.getUserWithFriends(this.currentUser!.id!).subscribe({
      next: (resp) => {
        this.friends.set(resp[this.currentUser!.id!]);
      },
      error: () => this.friends.set([])
    });
    return () => {
      if (sub) sub.unsubscribe();
    };
  }

  isFriend(user?: number) {
    return this.friends().some(f => f.friendId === user);
  }

  acceptFriend(notif: Notification) {
    const friendship: CreateRelation = {
      requester: notif.user,
      requested: this.currentUser!
    }
    this.#friendsService.create(friendship)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (resp) => { console.log(resp); },
        error: (error) => console.log(error.error)
      })
  }
}
