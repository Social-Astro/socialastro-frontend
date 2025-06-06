import { Component, signal } from '@angular/core';
import { NgIf, NgFor, DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Friend {
    id: number;
    name: string;
    avatar: string;
}

interface Message {
    id: number;
    text: string;
    date: Date;
    avatar: string;
    own: boolean;
}

@Component({
    selector: 'chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss',
    imports: [CommonModule, NgIf, NgFor, FormsModule, DatePipe]
})
export class ChatComponent {
    friends = [
        { id: 1, name: 'Irene', avatar: 'assets/avatars/avatar1.png' },
        { id: 2, name: 'Sandra', avatar: 'assets/avatars/avatar2.png' },
        { id: 3, name: 'Alien Queen', avatar: 'assets/normal/normal_alien_queens.png' },
        { id: 4, name: 'Spaceman', avatar: 'assets/normal/normal_spaceman_perfil.png' }
    ];

    selectedFriend: Friend | null = null;
    messages: Message[] = [];
    newMessage = '';

    trackByFriend = (_: number, friend: Friend) => friend.id;
    trackByMsg = (_: number, msg: Message) => msg.id;

    selectFriend(friend: Friend) {
        this.selectedFriend = friend;
        this.messages = [
            {
                id: 1,
                text: `ZibZib ${friend.name}! ¿Zigg?`,
                date: new Date(Date.now() - 1000 * 60 * 60),
                avatar: friend.avatar,
                own: false
            },
            {
                id: 2,
                text: '¡Բարև, շատ լավ',
                date: new Date(Date.now() - 1000 * 60 * 55),
                avatar: 'assets/avatars/avatar1.png',
                own: true
            }
        ];
        this.newMessage = '';
    }

    sendMessage() {
        if (!this.newMessage.trim() || !this.selectedFriend) return;
        this.messages = [
            ...this.messages,
            {
                id: Date.now(),
                text: this.newMessage,
                date: new Date(),
                avatar: 'assets/avatars/avatar1.png',
                own: true
            }
        ];
        this.newMessage = '';

        //NOTE: Lógica del socket.io
    }
}
