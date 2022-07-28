import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {
  user: User | undefined;
  sub!: Subscription;

  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe({
      next: params => {
        let id = Number(params['id']);
        if (!id) id = 1;
        this.user = undefined;

        this.service.users.subscribe({
          next: (users) => {
            if (!users.length) return;

            this.user = this.service.userById(id);
          }
        })
    }});
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
