import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;

  user: { id: number, name: string };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params.id,
      name: this.route.snapshot.params.name
    };

    // Observable subscribing for dynamic template updates
    this.paramsSubscription = this.route.params.subscribe(
      (params) => {
        this.user.id = params.id;
        this.user.name = params.name;
      }
    );
  }

  ngOnDestroy(): void {
    // normally once the component is disposed, angular unsubs automatically.
    // However for custom Observables, you might wanna unsub specifically
    this.paramsSubscription.unsubscribe();
  }
}
