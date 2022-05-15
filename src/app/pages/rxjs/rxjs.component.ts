import { ReturnStatement } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  intervalSubs: Subscription;

  constructor() {
    // this.returnObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (value) => console.log('Subs:', value),
    //     (error) => console.warn('Error:', error),
    //     () => console.log('Obs Finished')
    //   );

    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {}

  returnInterval(): Observable<number> {
    return interval(500).pipe(
      map((value) => value + 1),
      filter((value) => (value % 2 === 0 ? true : false)),
      take(10)
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 3) {
          i = 0;
          observer.error('an error');
        }
      }, 1000);
    });
  }
}
