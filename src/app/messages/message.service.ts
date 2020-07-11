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

    getMessages(){
        this.http.get('https://wdd430-cf3dc.firebaseio.com/messages.json')
        .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
    
                this.maxMessageId = this.getMaxId();
                this.messages.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
                this.messageListChangedEvent.next(this.messages.slice());
            },
            (error: any) => {
                console.log(error);
            }
        );
    }


    getMaxId(): number {
        let maxId = 0;
        for(const message of this.messages) {
          let currentId = parseInt(message.id);
   
          if(currentId > maxId) {
            maxId = currentId;
          }
        }
   
        return maxId;
      }

    addMessage(newMessage: Message) {
        if(!newMessage) {
            return;
          }
     
          this.maxMessageId++;
     
          newMessage.id =this.maxMessageId.toString();
     
          this.messages.push(newMessage);
     
          this.storeMessages();
    }

    storeMessages() {
        let messages = JSON.stringify(this.messages);

        const headers = new HttpHeaders({'Content-Type': 'application/json'});
   
        this.http.put('https://wdd430-cf3dc.firebaseio.com/messages.json', messages, {headers: headers})
        .subscribe(
          () => {
            this.messageListChangedEvent.next(this.messages.slice());
          }
        )
    }

}