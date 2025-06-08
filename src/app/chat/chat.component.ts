<<<<<<< Updated upstream
import { Component, inject, signal, effect } from '@angular/core';
=======
import { Component, inject, OnInit, effect, signal } from '@angular/core';
>>>>>>> Stashed changes
import { NgIf, NgFor, DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FriendService } from '../profile/services/friend.service';
import { UserService } from '../profile/services/user.service';
import { ChatSocketService } from './chat-socket.service';
import { Friend } from './interfaces/friend.interface';
import { Message } from './interfaces/message.interface';

@Component({
    selector: 'chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss',
    imports: [CommonModule, FormsModule, DatePipe]
})
export class ChatComponent {
<<<<<<< Updated upstream
    friends: Friend[] = [];
=======
    /* friends: Friend[] = []; */
    friends = signal<Friend[] | null>(null);
>>>>>>> Stashed changes
    selectedFriend: Friend | null = null;
    messages: Message[] = [];
    newMessage = '';
    private joinedRooms = new Set<string>();

    private friendService = inject(FriendService);
    private userService = inject(UserService);
    private chatSocket = inject(ChatSocketService);

<<<<<<< Updated upstream
    user = signal(this.userService.userSelected.value());
    userId = signal<number | null>(this.user()?.id ?? null);

=======
>>>>>>> Stashed changes
    constructor() {
        effect(() => {
            const user = this.user();
            this.userId.set(user?.id ?? null);
            if (this.userId()) {
                this.loadFriends(this.userId()!);
            } else {
                this.friends = [];
            }

<<<<<<< Updated upstream
        effect(() => {
            this.chatSocket.onRoomMessage().subscribe((data: { from: number; message: string; room: string }) => {
                if (!this.selectedFriend || !this.userId()) return;
                const currentRoom = this.generateRoomName(this.userId()!, this.selectedFriend.id);
=======
            this.chatSocket.onRoomMessage().subscribe((data: { from: number; message: string; room: string }) => {
                if (!this.selectedFriend || !this.userId) return;
                const currentRoom = this.generateRoomName(this.userId, this.selectedFriend.id);
>>>>>>> Stashed changes
                if (data.room === currentRoom) {
                    this.messages.push({
                        id: Date.now(),
                        text: data.message,
                        date: new Date(),
<<<<<<< Updated upstream
                        avatar: data.from === this.userId() ? this.friends.find((f) => f.id === this.userId())?.avatar || 'assets/avatars/avatar1.png' : this.selectedFriend.avatar,
                        own: data.from === this.userId()
=======
                        avatar: data.from === this.userId ? this.friends()!.find((f) => f.id === this.userId)?.avatar || 'assets/avatars/avatar1.png' : this.selectedFriend.avatar,
                        own: data.from === this.userId
>>>>>>> Stashed changes
                    });
                }
            });
        });
    }

    loadFriends(userId: number) {
        this.friendService.getUserWithFriends(userId).subscribe((friends: any[]) => {
            const auxfriends = friends[userId];
            this.friends.set(auxfriends.map((f: any) => ({
                id: f.friendId,
                name: f.friendName,
                avatar: f.friendAvatar || 'assets/avatars/avatar1.png'
            })));
            console.log(this.friends());
        });
    }

    selectFriend(friend: Friend) {
        this.selectedFriend = friend;
        this.messages = [];
        if (this.userId()) {
            const room = this.generateRoomName(this.userId()!, friend.id);
            this.chatSocket.joinRoom(room);
            this.joinedRooms.add(room);
        }
    }

    sendMessage() {
        if (!this.newMessage.trim() || !this.selectedFriend || !this.userId()) return;
        const room = this.generateRoomName(this.userId()!, this.selectedFriend.id);
        this.chatSocket.sendMessageToRoom(room, this.newMessage.trim());
        this.messages.push({
            id: Date.now(),
            text: this.newMessage,
            date: new Date(),
<<<<<<< Updated upstream
            avatar: this.friends.find((f) => f.id === this.userId())?.avatar || 'assets/avatars/avatar1.png',
=======
            avatar: this.friends()!.find((f) => f.id === this.userId)?.avatar || 'assets/avatars/avatar1.png',
>>>>>>> Stashed changes
            own: true
        });
        this.newMessage = '';
    }

    generateRoomName(user1: number, user2: number): string {
        const sorted = [user1, user2].sort((a, b) => a - b);
        return `chat_private_${sorted[0]}_${sorted[1]}`;
    }

    trackByFriend = (_: number, friend: Friend) => friend.id;
    trackByMsg = (_: number, msg: Message) => msg.id;
}
