import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/shared/Services/authentication-service.service';
import { ProductServiceService } from 'src/app/shared/Services/product-service.service';
import { productInfo } from 'src/app/shared/Models/product.model';
import { userData } from 'src/app/shared/Models/user.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {

  constructor(private prodService: ProductServiceService, private authService: AuthenticationServiceService) {
    //this.authService.profileUrl.subscribe(userProfile => {
    //this.uphotoUrl = userProfile;
    //});
  }
  productArray: productInfo[] = [];
  userPosts: userData[];
  prodId;
  userName;
  uphotoUrl;
  pic: boolean = false;
  Notpic: boolean = false;
  userId;
  uid;
  error = null;
  isFetching: boolean = false;
  @Output() date = new EventEmitter<number>();
  @Output() productLength = new EventEmitter<number>();
  @Input() sorting;

  ngOnInit(): void {
    this.fetchProduct(this.sorting);
  }

  fetchProduct(sorting: string) {
    this.isFetching = true;
    this.prodService.fetchProduct().subscribe(posts => {
      this.isFetching = false;
      this.productArray = posts;
      // console.log(this.productArray);
      this.productLength.emit(this.productArray.length);
      if (this.sorting == 'Most Recent') {
        this.productArray.sort((a, b) => {
          return <any>new Date(b.date) - <any>new Date(a.date);
        });
      } else {
        this.productArray.sort((b, a) => {
          return <any>new Date(b.date) - <any>new Date(a.date);
        });
      }
      for (let i = 0; i < this.productArray.length; i++) {
        this.prodService.fetchUserData(this.productArray[i].uid)
          .subscribe((res) => {
            // console.log(res);
            let uname = res[0].username;
            this.productArray[i].uname = uname;
            let uimage = res[0].profileUrl;
            this.productArray[i].uphotoUrl = uimage;
            if (uimage == undefined || uimage == " ") {
              this.productArray[i].pic = false;
            }
            else {
              this.productArray[i].pic = true;
            }
          })
      }
      console.log(this.productArray);
    }, error => {
      this.error = error.message;
    })
  }
  ngOnChanges() {
    //console.log(this.sortingWay);
    this.fetchProduct(this.sorting);
  }

}
