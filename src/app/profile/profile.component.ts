import { Component, computed, DestroyRef, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { UserService } from './services/user.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AuthService } from '../auth/services/auth.service';
import { ProfileAchievementsComponent } from './profile-achievements/profile-achievements.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { PostsService } from '../home/services/posts.service';
import { Post } from '../home/interfaces/post';
import { FriendService } from './services/friend.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { NotificationsService } from '../home/services/notifications.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFriendNotificationDto, FriendsByUser } from '../interfaces/user';
import { AchievementService } from '../achievements/services/achievements.service';
import { Achievement } from '../achievements/interfaces/achievements';

@Component({
    selector: 'profile',
    standalone: true,
    imports: [ProfileEditComponent, ProfileAchievementsComponent, ProfileFriendsComponent, ProfilePostsComponent, PaginatorModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    public readonly userId = input.required({ transform: numberAttribute });
    private readonly profileService = inject(UserService);
    private readonly authService = inject(AuthService);
    private readonly notificationsService = inject(NotificationsService);
    private readonly postsService = inject(PostsService);
    private readonly achievementsService = inject(AchievementService);
    private readonly friendService = inject(FriendService);
    private readonly destroyRef = inject(DestroyRef);
    userResource = this.profileService.userSelected;
    readonly user = this.userResource.value();
    editMode = signal(false);
    editPasswordMode = signal(false);
    canEdit = signal(false);
    userPosts = signal<Post[]>([]);
    totalPosts = signal<number>(0);
    pagePosts = 1;
    userIdPost = 0;

    friendRequest = signal(false);
    isMe = signal(false);
    isMyFriend = signal(false);

    realFriends = signal<FriendsByUser[]>([]);
    realAchievements = signal<Achievement | null>(null);

    activeSection = signal<'posts' | 'friends' | 'achievements' | null>(null);
    userFriends = computed(() => (this.userResource.value() as any)?.friends ?? []);
    userAchievements = computed(() => (this.userResource.value() as any)?.achievements ?? []);

    constructor() {
        effect(() => {
            this.profileService.setCurrentUser(this.userId());
        });

        effect(() => {
            const user = this.authService.currentUser.value();
            const profileUser = this.userResource.value();
            if (!user || !profileUser) {
                this.canEdit.set(false);
                return;
            }
            const currentRole = user.role.toUpperCase();
            const currentId = user.id;
            this.canEdit.set(currentId === profileUser.id || currentRole === 'ADMIN');
            this.isMe.set(currentId === profileUser.id);
            this.setFriends(profileUser.id!, user.id!);
            this.setAchievements(profileUser.id!);
        });

        effect(() => {
            let sub: any;
            if (this.activeSection() === 'posts') {
                const userId = this.userResource.value()?.id;
                if (typeof userId === 'number') {
                    sub = this.getPostsByUser(userId);
                    this.userIdPost = userId;
                } else {
                    this.userPosts.set([]);
                }
            }
            return () => {
                if (sub) sub.unsubscribe();
            };
        });
    }

    setFriends(userId: number, currentUser: number) {
        let sub: any;
        if (typeof userId === 'number') {
            sub = this.friendService.getUserWithFriends(userId).subscribe({
                next: (resp) => {
                    this.realFriends.set(resp[userId]);
                    this.isMyFriend.set(this.realFriends().some((f) => f.friendId === currentUser));
                },
                error: () => this.realFriends.set([])
            });
        } else {
            this.realFriends.set([]);
        }
        return () => {
            if (sub) sub.unsubscribe();
        };
    }

    setAchievements(userId: number) {
        let sub: any;
        if (typeof userId === 'number') {
            sub = this.achievementsService.getAchievementByUser(userId).subscribe({
                next: (resp) => {
                    console.log(resp);
                    this.realAchievements.set(resp);
                },
                error: () => { this.realAchievements.set(null) }
            });
        } else {
            this.realAchievements.set(null);
        }
        return () => {
            if (sub) sub.unsubscribe();
        };
    }

    changeEditMode() {
        this.editMode.update((oldValue) => !oldValue);
    }

    changePasswordMode() {
        this.editPasswordMode.update((oldValue) => !oldValue);
    }

    headerBackgroundStyle = computed(() => {
        const user = this.userResource.value;
        if (user()?.heading) {
            return { 'background-image': `url(${user()?.heading})` };
        }
        return {};
    });

    setEditMode(value: boolean) {
        this.editMode.set(value);
        if (!value) {
            this.editPasswordMode.set(false);
        }
    }

    setActiveSection(section: 'posts' | 'friends' | 'achievements') {
        this.activeSection.set(this.activeSection() === section ? null : section);
    }

    isAdmin() {
        const user = this.authService.currentUser.value();
        return user && user.role === 'ADMIN';
    }

    getPostsByUser(userId: number) {
        this.postsService.getPostsByUser(userId, this.pagePosts).subscribe({
            next: (resp) => {
                this.userPosts.set(resp.posts);
                this.totalPosts.set(resp.count);
                this.pagePosts = resp.page;
            },
            error: () => this.userPosts.set([])
        });
    }

    onPostPageChange(event: PaginatorState) {
        this.pagePosts = ++event.page!;
        this.getPostsByUser(this.userIdPost);
    }

    sendFriendRequest(user: number) {
        const friend: CreateFriendNotificationDto = {
            owner: user
        };
        this.notificationsService
            .generateFriendNotif(friend)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => this.friendRequest.set(true),
                error: (error) => console.log(error.error)
            });
    }
}
