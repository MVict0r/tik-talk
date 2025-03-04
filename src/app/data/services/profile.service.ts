import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {ProfileInterface} from '../interfaces/profile.interface';
import {PagebleInterface} from '../interfaces/pageble.interface';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<ProfileInterface | null>(null);
  filteredProfiles = signal<ProfileInterface[]>([])

  getTestAccounts() {
    return this.http.get<ProfileInterface[]>(
      `${this.baseApiUrl}account/test_accounts`
    );
  }

  getAccount(id: string) {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/${id}`);
  }

  getMe() {
    return this.http
      .get<ProfileInterface>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getSubscribersShortList(subsAmount = 5) {
    return this.http
      .get<PagebleInterface<ProfileInterface>>(
        `${this.baseApiUrl}account/subscribers/?page=1&size=5`
      )
      .pipe(
        map(
          (res) => res.items.slice(1, subsAmount)
        )
      );
  }

  patchProfile(profile: Partial<ProfileInterface>){
    return this.http.patch<ProfileInterface>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File){
    const fd: FormData = new FormData()
    fd.append('image', file)

    return this.http.post<ProfileInterface>(
      `${this.baseApiUrl}account/upload_image`, fd
    );
  }

  filterProfile(params: Record<string, any>){
    return this.http
      .get<PagebleInterface<ProfileInterface>>(
        `${this.baseApiUrl}account/accounts`,
        {
          params
        }
      ).pipe(
        tap(res => this.filteredProfiles.set(res.items)),
      )
  }
}
