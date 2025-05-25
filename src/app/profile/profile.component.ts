import { Component, computed, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { UserService } from './services/user.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AuthService } from '../auth/services/auth.service';
import { ProfileAchievementsComponent } from './profile-achievements/profile-achievements.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';

@Component({
    selector: 'profile',
    standalone: true,
    imports: [ProfileEditComponent, ProfileAchievementsComponent, ProfileFriendsComponent, ProfilePostsComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    public readonly userId = input.required({ transform: numberAttribute });
    private readonly profileService = inject(UserService);
    private readonly authService = inject(AuthService);
    userResource = this.profileService.userSelected;
    readonly user = this.userResource.value;
    editMode = signal(false);
    editPasswordMode = signal(false);
    canEdit = signal(false);

    // Estado para la sección activa
    activeSection = signal<'posts' | 'friends' | 'achievements' | null>(null);

    // Datos ficticios
    fakePosts = [
        { title: 'Mi primer post', content: 'Contenido de ejemplo', id: 1 },
        { title: 'Otro post', content: 'Más contenido', id: 2 },
        { title: 'Post interesante', content: 'Contenido interesante', id: 3 }
    ];
    fakeFriends = [
        { name: 'Jorge', id: 1 },
        { name: 'Chuss', id: 2 },
        { name: 'Sandra', id: 3 }
    ];
    fakeAchievements = [
        { name: '¡Bienvenido!', icon: 'assets/achievements/logro-new-user.png' },
        { name: 'Esto solo acaba de comenazr', icon: 'assets/achievements/logro-start.png' },
        { name: 'Tu primera amistad', icon: 'assets/achievements/logro-friend.png' }
    ];

    constructor() {
        console.log('ProfileComponent initialized with userId:');
        effect(() => {
            this.profileService.setCurrentUser(this.userId());
        });

        effect(() => {
            const user = this.authService.currentUser.value();
            console.log('Current User:', user);
            const profileUser = this.userResource.value();
            if (!user || !profileUser) {
                this.canEdit.set(false);
                return;
            }
            const currentRole = user.role.toUpperCase();
            const currentId = user.id;
            this.canEdit.set(currentId === profileUser.id || currentRole === 'ADMIN');
        });
    }

    changeEditMode() {
        this.editMode.update((oldValue) => !oldValue);
    }

    changePasswordMode() {
        this.editPasswordMode.update((oldValue) => !oldValue);
    }

    // Calcula el estilo del heading dinámicamente
    headerBackgroundStyle = computed(() => {
        const user = this.userResource.value;
        if (user()?.heading) {
            return { 'background-image': `url(${user()?.heading})` };
        }
        return {};
    });

    // REVIEW: El estilo del header se calcula dinámicamente basado en el header del usuario actual. Queremos default o no.

    // headerBackgroundStyle = computed(() => {
    //     const user = this.currentUser();
    //     const headerUrl = user && user.heading ? user.heading : 'assets/default-header.png';
    //     return { 'background-image': `url(${headerUrl})` };
    // });

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
}
