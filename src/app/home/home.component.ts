import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(`The current count is: ${count}`);
    });
  }

  // Whenever using a custom observable, always make sure to unsubscribe.
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
