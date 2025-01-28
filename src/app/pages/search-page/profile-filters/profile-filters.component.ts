import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileService} from "../../../data/services/profile.service";
import {debounceTime, startWith, Subscription, switchMap} from "rxjs";


@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })

  searchFormSub!: Subscription

  constructor() {
  this.searchFormSub = this.searchForm.valueChanges
    .pipe(
      startWith({}),
      debounceTime(300),
      switchMap(formValue => {
        return this.profileService.filterProfile(formValue);
      }),
    )
    .subscribe()
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe()
  }

}
