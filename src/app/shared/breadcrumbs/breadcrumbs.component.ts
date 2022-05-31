import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  title: string = '';
  tituloSubs$: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) {
    // console.log(route.snapshot.children[0].data);

    this.tituloSubs$ = this.getArgsRoute().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgsRoute() {
    return this.router.events.pipe(
      filter<any>((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
