import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/shared/Services/authentication-service.service';
import { userData } from 'src/app/shared/Models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('signInForm', { static: true }) templateFormViewChild: NgForm;

  constructor(private authService: AuthenticationServiceService, private router: Router) { }

  users: userData[];
  email;
  password;
  invalidUser: boolean;
  validUser: boolean;
  ngOnInit(): void {
  }

  signin(email: string, password: string) {
    this.fetchdata(email, password);
  }

  fetchdata(email: string, password: string) {
    this.authService.fetchUserData().subscribe(posts => {
      this.users = posts;
      //console.log(this.users);

      this.users.filter((obj) => {
        //console.log(obj);
        //console.log(obj.email);
        //console.log(obj.id);
        if (obj.email === email && obj.password === password) {
          this.validUser = true;
          this.invalidUser = false;
          this.router.navigate(['/home/userprofile', obj.id]);
        }
        else {
          this.invalidUser = true;
          this.validUser = false;
          this.templateFormViewChild.reset();
        }
      })
    });
  }

}
