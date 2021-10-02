import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/shared/Services/authentication-service.service';
import { userData } from 'src/app/shared/Models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ChangeProfileDialogComponent } from '../change-profile-dialog/change-profile-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public authService: AuthenticationServiceService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog) {
    this.authService.profileUrl.subscribe(userProfile => {
      this.profileUrl = userProfile
      console.log(this.profileUrl);
    });
  }
  name: string;
  profileUrl: string;
  email: string;
  pic: boolean = false;
  index: string;
  url;
  Notpic: boolean = false;
  userPosts: userData[] = [];

  ngOnInit(): void {
    //console.log(this.route.snapshot.params.id);
    this.authService.getCurrentUserData(this.route.snapshot.params.id).subscribe((res) => {
      //console.log(res);
      this.name = res['username'];
      this.email = res['email'];
      this.profileUrl = res['profileUrl'];
      if (this.profileUrl == undefined || this.profileUrl == " ") {
        this.pic = false;
        this.Notpic = true;
      }
      else {
        this.pic = true;
        this.Notpic = false;
      }
    });
  }

  onSetting() {
    this.index = this.route.snapshot.params.id;
    this.router.navigate(['/setting/update', this.index]);
  }

  openDialog() {
    this.dialog.open(ChangeProfileDialogComponent, { data: { uid: this.route.snapshot.params.id } });
  }
}
