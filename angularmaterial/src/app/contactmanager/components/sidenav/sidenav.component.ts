import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Direction } from '@angular/cdk/bidi';
import { Observable, Subscription } from 'rxjs';

import { UserService } from './../../services/user.service';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT: number = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isScreenSmall!: boolean;
  isDarkTheme: boolean = false;
  dir: Direction = 'ltr';
  sub!: Subscription;

  users!: Observable<User[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router
  ) { }

  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;

  ngOnInit(): void {
    this.breakpointObserver
      // .observe(Breakpoints.XSmall)
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      })

    this.users = this.userService.users;
    this.userService.loadAll();

    this.sub = this.router.events.subscribe({
      next: () => {
        if (this.isScreenSmall && this.sidenav) {
          this.sidenav.close();
        }
      }
    })
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir(): void {
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
