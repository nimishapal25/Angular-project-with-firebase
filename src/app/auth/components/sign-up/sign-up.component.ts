import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/shared/Services/authentication-service.service';
import { userData } from 'src/app/shared/Models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthenticationServiceService, private router: Router) {
  }
  @ViewChild('signUpForm', { static: true }) templateFormViewChild: NgForm;

  ngOnInit(): void {
  }
  username;
  email;
  password;
  id;
  userPosts: userData[] = [];

  signup(signUpForm: userData) {
    this.userPosts.push(signUpForm);
    this.authService.createAndPostUser(signUpForm)
      .subscribe((res) => {
        console.log(res);
      });
    alert("Registered successfully");
    this.fetchData();
  }


  fetchData() {
    this.authService.fetchUserData().subscribe(posts => {
      this.userPosts = posts;
      console.log(this.userPosts);

      this.userPosts.filter((obj) => {
        //console.log(obj);
        //console.log(obj.email);
        //console.log(obj.id);
        this.router.navigate(['/home/userprofile', obj.id]);
      })
    });
  }

}
