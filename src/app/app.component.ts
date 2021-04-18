import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'notification-pwa';

    @ViewChild('copyArea') copyArea: ElementRef<HTMLTextAreaElement>;

    info: any = {
        endpoint: '',
        keys: {
            p256dh: '',
            auth: '',
        },
    };

    readonly VAPID_PUBLIC_KEY = 'BG0DMhVn6rpUuLgFPBIeRcTNCgBlUimko5pgzdBPfpVnhbqbCGwkn-D4bJCp0gSMyzMbpRwXu8FheI471If3las';

    constructor(
        private push: SwPush,
        @Inject(DOCUMENT) private document: Document,
    ) {
    }

    public subscribeForNotifications(): void {
        this.push
            .requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY
            })
            .then(sub => this.info = sub.toJSON())
            .catch(console.error);
    }

    public copySubscriptionKeys(): void {
        if (!this.copyArea) { return; }

        this.copyArea.nativeElement.value = JSON.stringify({
            endpoint: this.info.endpoint,
            p256dh: this.info.keys?.p256dh,
            auth: this.info.keys?.auth,
        });

        this.copyArea.nativeElement.hidden = false;
        this.copyArea.nativeElement.focus();
        this.copyArea.nativeElement.select();
        this.document.execCommand('copy');

        this.copyArea.nativeElement.hidden = true;
    }

}
