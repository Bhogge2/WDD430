import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messages: Message[] = [];
    messageListChangedEvent = new Subject<Message[]>();
    maxMessageId: number;

    constructor(private http: HttpClient) {
    }

    getMessages() {
        this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
            .subscribe(
                (response) => {
                    this.messages = response.messages;
                    this.sortAndSend();
                }
            )
    }

    getMessage(id: string): Message {
        for (const message of this.messages) {
          if (message.id === id) {
            return message;
          }
        }
        return null;
      }


    // getMaxId(): number {
    //     let maxId = 0;
    //     for(const message of this.messages) {
    //       let currentId = parseInt(message.id);

    //       if(currentId > maxId) {
    //         maxId = currentId;
    //       }
    //     }

    //     return maxId;
    //   }

    addMessage(message: Message) {
        if (!message) {
            return;
        }

        message.id = '';

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        this.http.post<{ response: string, message: Message }>('http://localhost:3000/messages', message, { headers: headers })
            .subscribe(
                (responseData) => {
                    message.id = responseData.message.id;

                    this.messages.push(responseData.message);
                    this.sortAndSend();
                }
            )

    }

    sortAndSend() {
        this.messages.sort((a, b) => a.id > b.id ? 1 : b.id > a.id ? -1 : 0);
        this.messageListChangedEvent.next(this.messages.slice());
    }

    // storeMessages() {
    //     let messages = JSON.stringify(this.messages);

    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //     this.http.put('https://wdd430-cf3dc.firebaseio.com/messages.json', messages, {headers: headers})
    //     .subscribe(
    //       () => {
    //         this.messageListChangedEvent.next(this.messages.slice());
    //       }
    //     )
    // }

}