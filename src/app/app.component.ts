import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notification-pwa';
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
  ) {}

  public action1(): void {
    this.push
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => this.info = sub.toJSON())
      .catch(console.error);
  }

  public action2(): void {
  }

  public action3(): void {
  }
}
