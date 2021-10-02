import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/shared/Services/authentication-service.service';
import { ProductServiceService } from 'src/app/shared/Services/product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private prodService: ProductServiceService, private authService: AuthenticationServiceService
    , private route: ActivatedRoute) { }
  url: string;
  pDate;
  pImageName: string;
  pImageSize;
  isFetching: boolean = false;
  prodId;

  ngOnInit(): void {
    this.isFetching = true;
    this.route.params.subscribe((param) => {
      this.isFetching = false;
      this.prodId = param['prodId'];
      console.log(this.prodId);
      this.prodService.getCurrentProduct(this.prodId)
        .subscribe((res) => {
          console.log(res);
          this.url = res['pphotoUrl'];
          this.pDate = res['date'];
          this.pImageName = res['imageName'];
          this.pImageSize = res['imageSize'];
        })
    })
  }


}

