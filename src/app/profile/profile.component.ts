import { Component, computed, effect, inject, input, numberAttribute, signal } from '@angular/core';
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
    private readonly postsService = inject(PostsService);
    private readonly friendService = inject(FriendService);
    userResource = this.profileService.userSelected;
    readonly user = this.userResource.value;
    editMode = signal(false);
    editPasswordMode = signal(false);
    canEdit = signal(false);
    userPosts = signal<Post[]>([]);
    totalPosts = signal<number>(0);
    pagePosts = 1;
    userIdPost = 0;

    realFriends = signal<any[]>([]);

    activeSection = signal<'posts' | 'friends' | 'achievements' | null>(null);
    userFriends = computed(() => (this.userResource.value() as any)?.friends ?? []);
    userAchievements = computed(() => (this.userResource.value() as any)?.achievements ?? []);

    constructor() {
        console.log('ProfileComponent initialized with userId:');
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

        effect(() => {
            let sub: any;
            if (this.activeSection() === 'friends') {
                const userId = this.userResource.value()?.id;
                if (typeof userId === 'number') {
                    sub = this.friendService.getUserWithFriends(userId).subscribe({
                        next: (resp) => this.realFriends.set(resp.friends ?? resp ?? []),
                        error: () => this.realFriends.set([])
                    });
                } else {
                    this.realFriends.set([]);
                }
            }
            return () => {
                if (sub) sub.unsubscribe();
            };
        });
    }

    changeEditMode() {
        this.editMode.update((oldValue) => !oldValue);
    }

    changePasswordMode() {
        this.editPasswordMode.update((oldValue) => !oldValue);
    }

    // BUG: el avatar y el header no se previsualizan correctamente.
    // REVIEW: Poner una imagen por defecto si no hay heading, que no hay.
    headerBackgroundStyle = computed(() => {
        const user = this.userResource.value;
        if (user()?.heading) {
            return { 'background-image': `url(${user()?.heading})` };
        }
        return {};
    });

    // Permite activar/desactivar el modo edición desde el HTML
    setEditMode(value: boolean) {
        this.editMode.set(value);
        if (!value) {
            this.editPasswordMode.set(false);
        }
    }

    setActiveSection(section: 'posts' | 'friends' | 'achievements') {
        this.activeSection.set(this.activeSection() === section ? null : section);
    }

    get isAdmin() {
        const user = this.authService.currentUser.value();
        return user && user.role === 'ADMIN';
    }

    getPostsByUser(userId: number) {
        this.postsService.getPostsByUser(userId, this.pagePosts).subscribe({
            next: (resp) => {
                console.log(resp.posts);
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
}
