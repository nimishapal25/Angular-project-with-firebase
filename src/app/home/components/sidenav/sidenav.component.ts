import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }
  disableSelect = new FormControl(false);
  productLength;
  date;
  ngOnInit(): void {
  }
  close: boolean;
  sortingProduct: string = 'Most Recent';

  noOfproduct(event) {
    this.productLength = event;
  }

  sortProduct(event) {
    this.sortingProduct = event.value;
  }

  closed(event) {
    this.close = true;
  }
}
