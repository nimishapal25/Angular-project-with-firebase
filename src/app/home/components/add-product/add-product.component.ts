import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/shared/Services/authentication-service.service';
import { ProductServiceService } from 'src/app/shared/Services/product-service.service';
import { productInfo } from 'src/app/shared/Models/product.model';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private prodService: ProductServiceService, private authService: AuthenticationServiceService
    , private route: ActivatedRoute) { }
  productPosts: productInfo[] = this.prodService.product;
  productData: productInfo[];
  uid;
  pid;
  pname;
  pdescription;
  pphotoUrl;
  url;
  index;
  uname;
  uphotoUrl;
  prodImageName;
  imageName;
  date;
  prodImageSize;
  imageSize;
  @Input() closed;
  addProduct = new FormGroup(
    {
      "pid": new FormControl(null),
      "pname": new FormControl(null),
      "pdescription": new FormControl(null),
      "pphotoUrl": new FormControl(null),
    }
  );

  ngOnInit(): void {
    this.prodService.fetchProduct().subscribe(posts => {
      this.productData = posts;
    });
  }
  uploadFile(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
      this.prodImageName = event.target.files[0].name;
      this.prodImageSize = event.target.files[0].size;
      reader.onload = (e: any) => {
        this.url = e.target.result;
        //console.log(this.url);
      }
    }
  }

  onAddingProduct() {
    this.uid = this.route.snapshot.params.id;
    //console.log(this.uid);
    this.pid = this.addProduct.get('pid').value;
    this.pname = this.addProduct.get('pname').value;
    this.pdescription = this.addProduct.get('pdescription').value;
    this.pphotoUrl = this.url;
    console.log(this.pphotoUrl);
    this.date = new Date().toString();
    this.imageName = this.prodImageName;
    this.imageSize = this.prodImageSize;
    //console.log(this.pid);

    this.authService.getCurrentUserData(this.route.snapshot.params.id)
      .subscribe((res) => {
        console.log(res);
        this.uname = res['username'];
        this.uphotoUrl = res['photoUrl'];
      })
    this.productPosts.push(
      this.index,
      this.uid = this.route.snapshot.params.id,
      this.pid,
      this.pname,
      this.pdescription,
      this.pphotoUrl,
      this.imageName,
      this.date,
      this.imageSize
    );
    this.prodService.postProduct(
      this.index,
      this.uid,
      this.pid,
      this.pname,
      this.pdescription,
      this.pphotoUrl,
      this.imageName,
      this.date,
      this.imageSize,
    ).subscribe((res) => {
      console.log(res);
    });
    this.addProduct.reset();
  }

  onClose() {
    this.closed = true;
  }

}
