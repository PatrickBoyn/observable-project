import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(`The current count is: ${count}`);
    // });
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(
      countedNumber => {
        console.log(`Current count: ${countedNumber}`);
      },
      error => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log('Interval complete!');
      }
    );
  }

  // Whenever using a custom observable, always make sure to unsubscribe.
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
