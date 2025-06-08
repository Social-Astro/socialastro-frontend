import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatSocketService {
    constructor(private socket: Socket) {}

    joinRoom(room: string) {
        this.socket.emit('joinRoom', room);
    }

    leaveRoom(room: string) {
        this.socket.emit('leaveRoom', room);
    }

    sendMessageToRoom(room: string, message: string) {
        this.socket.emit('sendMessageToRoom', { room, message });
    }

    onRoomMessage(): Observable<any> {
        return this.socket.fromEvent('roomMessage');
    }

    onJoinedRoom(): Observable<string> {
        return this.socket.fromEvent('joinedRoom');
    }

    onLeftRoom(): Observable<string> {
        return this.socket.fromEvent('leftRoom');
    }
}
