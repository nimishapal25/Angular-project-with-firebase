import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/shared/Services/authentication-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-profile-dialog',
  templateUrl: './change-profile-dialog.component.html',
  styleUrls: ['./change-profile-dialog.component.css']
})
export class ChangeProfileDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthenticationServiceService,
    private route: ActivatedRoute, private router: Router) {
    this.authService.profileUrl.subscribe(userProfile => {
      this.profileUrl = userProfile
    });
  }

  name: string;
  Url: string;
  email: string;
  pic: boolean = false;
  id;
  userData: any;
  profileUrl;
  uploadForm: NgForm;

  ngOnInit(): void {
    //console.log(this.name);
    //console.log(this.data.uid);
    this.id = this.data.uid;
    this.authService.getCurrentUserData(this.data.uid)
      .subscribe((res) => {
        console.log(res);
        this.profileUrl = res['profileUrl'];
        this.name = res['username'];
        this.authService.profileUrl.next(this.profileUrl);
        //console.log(this.profileUrl);
        //this.profileUrl = this.Url;
        console.log(this.name);
        if (!this.profileUrl || this.profileUrl == " ") {
          this.pic = false;
        }
        else {
          this.pic = true;
        }
      })
  }

  uploadFile(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.Url = e.target.result;
        console.log(this.Url);
      }
    }
  }

  onSave() {

    this.profileUrl = this.Url
    this.authService.updateUserImage(this.data.uid, this.profileUrl)
      .subscribe((res) => {
        console.log(res);
      })
  }

  onRemove() {
    this.profileUrl = " ";
    this.authService.updateUserImage(this.data.uid, this.profileUrl)
      .subscribe((res) => {
        console.log(res);
      })
  }

}
