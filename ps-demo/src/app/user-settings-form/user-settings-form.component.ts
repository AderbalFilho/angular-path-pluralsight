import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { UserSettings } from './../data/user-settings';
import { DataService } from './../data/data.service';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit, OnDestroy {
  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };
  singleModel = 'On';
  startDate!: Date;
  startTime!: Date;
  userRating: number = 0;
  maxRating: number = 10;
  isReadonly: boolean = false;
  userSettings: UserSettings = { ...this.originalUserSettings };
  sub: Subscription | undefined;
  postError: boolean = false;
  postErrorMessage: string = '';
  subscriptionTypes!: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();

    this.startDate = new Date();
    this.startTime = new Date();
  }

  onBlur(field: NgModel): void {
    console.log('in onBlur: ', field.valid);
  }

  onHttpError(errorResponse: any): void {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm): void {
    console.log('in onSubmit: ', form.value);

    // if (form.valid) {
    //   this.sub = this.dataService.postUserSettingsForm(this.userSettings).subscribe({
    //     next: result => console.log('success: ', result),
    //     error: error => this.onHttpError(error),
    //   });
    // } else {
    //   this.postError = true;
    //   this.postErrorMessage = 'Please fix the above errors';
    // }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
