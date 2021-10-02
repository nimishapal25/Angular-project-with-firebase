import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userData } from '../Models/user.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient) { }
  users: userData[];
  profileUrl = new Subject<string>();

  createAndPostUser(signUpForm: userData) {
    return this.http.post<{ [key: string]: userData }>('https://httpdemo-c9b46-default-rtdb.firebaseio.com/users.json', signUpForm)
  }
  userArray: userData[] = [];
  fetchUserData() {
    return this.http.get<{ [key: string]: userData }>('https://httpdemo-c9b46-default-rtdb.firebaseio.com/users.json')
      .pipe(map(responseUserData => {

        for (const key in responseUserData) {
          this.userArray.push({ ...responseUserData[key], id: key })
        }
        //console.log(this.userArray);
        return this.userArray;
      }));
  }

  getCurrentUserData(id) {
    return this.http.get('https://httpdemo-c9b46-default-rtdb.firebaseio.com/users/' + id + '.json');
  }

  updateUserData(id, signForm) {
    return this.http.put('https://httpdemo-c9b46-default-rtdb.firebaseio.com/users/' + id + '.json', signForm);
  }

  updateUserImage(id, profileUrl) {
    return this.http.put('https://httpdemo-c9b46-default-rtdb.firebaseio.com/users/' + id + '/profileUrl.json', JSON.stringify(profileUrl));
  }

  updateUserInitials(id, initials) {
    return this.http.put('https://httpdemo-c9b46-default-rtdb.firebaseio.com/users/' + id + '/initials.json', JSON.stringify(initials));
  }


}
