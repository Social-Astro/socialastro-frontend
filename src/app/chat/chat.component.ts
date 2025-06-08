import { Component, inject, OnInit, effect } from '@angular/core';
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
export class ChatComponent implements OnInit {
    friends: Friend[] = [];
    selectedFriend: Friend | null = null;
    messages: Message[] = [];
    newMessage = '';
    private userId: number | null = null;
    private joinedRooms = new Set<string>();

    private friendService = inject(FriendService);
    private userService = inject(UserService);
    private chatSocket = inject(ChatSocketService);

    ngOnInit() {
        effect(() => {
            const user = this.userService.userSelected.value();
            this.userId = user?.id || null;
            if (this.userId) {
                this.loadFriends(this.userId);
            }
        });

        this.chatSocket.onRoomMessage().subscribe((data: { from: number; message: string; room: string }) => {
            if (!this.selectedFriend || !this.userId) return;
            const currentRoom = this.generateRoomName(this.userId, this.selectedFriend.id);
            if (data.room === currentRoom) {
                this.messages.push({
                    id: Date.now(),
                    text: data.message,
                    date: new Date(),
                    avatar: data.from === this.userId ? this.friends.find((f) => f.id === this.userId)?.avatar || 'assets/avatars/avatar1.png' : this.selectedFriend.avatar,
                    own: data.from === this.userId
                });
            }
        });
    }

    loadFriends(userId: number) {
        this.friendService.getUserWithFriends(userId).subscribe((friends: any[]) => {
            this.friends = friends.map((f) => ({
                id: f.id,
                name: f.name,
                avatar: f.avatar || 'assets/avatars/avatar1.png'
            }));
        });
    }

    selectFriend(friend: Friend) {
        this.selectedFriend = friend;
        this.messages = [];
        if (this.userId) {
            const room = this.generateRoomName(this.userId, friend.id);
            this.chatSocket.joinRoom(room);
            this.joinedRooms.add(room);
        }
    }

    sendMessage() {
        if (!this.newMessage.trim() || !this.selectedFriend || !this.userId) return;
        const room = this.generateRoomName(this.userId, this.selectedFriend.id);
        this.chatSocket.sendMessageToRoom(room, this.newMessage.trim());
        this.messages.push({
            id: Date.now(),
            text: this.newMessage,
            date: new Date(),
            avatar: this.friends.find((f) => f.id === this.userId)?.avatar || 'assets/avatars/avatar1.png',
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
