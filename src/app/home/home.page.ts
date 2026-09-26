import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular';

const STORAGE_KEY = 'apple-tally-v1';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage implements OnInit {
  count = 0;
  pop = false;

  private popTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {}

  ngOnInit() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        this.count = typeof data.count === 'number' ? data.count : 0;
      }
    } catch {
      // ignore corrupt storage
    }
  }

  increment() {
    this.count += 1;
    this.bump();
    this.save();
  }

  decrement() {
    this.count -= 1;
    this.bump();
    this.save();
  }

  reset() {
    this.count = 0;
    this.bump();
    this.save();
  }

  private bump() {
    this.pop = false;
    requestAnimationFrame(() => {
      this.pop = true;
      if (this.popTimeout) {
        clearTimeout(this.popTimeout);
      }
      this.popTimeout = setTimeout(() => {
        this.pop = false;
      }, 180);
    });
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: this.count }));
    } catch {
      // storage unavailable - ignore
    }
  }
}
