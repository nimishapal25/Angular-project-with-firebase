import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/shared/Services/authentication-service.service';
import { userData } from 'src/app/shared/Models/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private authService: AuthenticationServiceService, private route: ActivatedRoute, private router: Router) { }
  userPosts: userData[] = [];
  id: string;
  index: string;
  profileUrl: string;
  userUpdateform: FormGroup;

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    this.userUpdateform = new FormGroup(
      {
        "username": new FormControl(null, [Validators.required]),
        "bio": new FormControl(null),
        "email": new FormControl(null, [Validators.required]),
        "password": new FormControl(null, [Validators.required]),
      }
    )
    this.authService.getCurrentUserData(this.route.snapshot.params.id).subscribe((res) => {
      console.log(res);
      this.profileUrl = res['profileUrl'];
      this.userUpdateform.controls.username.setValue(res['username']);
      this.userUpdateform.controls.bio.setValue(res['bio']);
      this.userUpdateform.controls.email.setValue(res['email']);
      this.userUpdateform.controls.password.setValue(res['password']);
      console.log(res['profileUrl']);
      console.log(res['username']);
    })
  }

  onUpdate(updateData: userData) {
    updateData.profileUrl = this.profileUrl;
    this.authService.updateUserData(this.route.snapshot.params.id, updateData)
      .subscribe(res => {
        console.log(res, "data updated successfully")
        this.index = this.route.snapshot.params.id;
        console.log(this.index);
        this.authService.fetchUserData();
        this.router.navigate(['/home/userprofile', this.index]);
      });
  }
}
