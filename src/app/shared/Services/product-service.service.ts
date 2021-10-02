import { Injectable } from '@angular/core';
import { productInfo } from '../Models/product.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { userData } from '../Models/user.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }
  product: productInfo[] = [];
  user: userData[];
  subject = new Subject<{ index: number, uid: string, pid: string, pname: string, pdescription: string, pphotoUrl: string, imageName: string, date: any, imageSize: any }>();

  postProduct(index: number, uid: string, pid: string, pname: string, pdescription: string, pphotoUrl: string, imageName: string, date: any, imageSize: any) {
    return this.http.post('https://httpdemo-c9b46-default-rtdb.firebaseio.com/products.json', { index, uid, pid, pname, pdescription, pphotoUrl, imageName, date, imageSize });
  }

  fetchProduct() {
    return this.http.get<{ [key: string]: productInfo }>('https://httpdemo-c9b46-default-rtdb.firebaseio.com/products.json')
      .pipe(map(responseUserData => {
        const productArray: productInfo[] = [];
        for (const key in responseUserData) {
          productArray.push({ ...responseUserData[key], prodId: key })
        }
        //console.log(productArray);
        return productArray;
      }), catchError(errorRes => {
        return throwError(errorRes);
      }));
  }

  getCurrentProduct(pid) {
    return this.http.get('https://httpdemo-c9b46-default-rtdb.firebaseio.com/products/' + pid + '.json');
  }

  fetchUserData(uid: string) {
    return this.http.get<{ [key: string]: productInfo }>('https://httpdemo-c9b46-default-rtdb.firebaseio.com/users/' + uid + '.json')
      .pipe(map((responseData) => {
        //console.log(responseData);
        const userList: any[] = [];
        let userName = responseData.username;
        let userProfileUrl = responseData.profileUrl;
        userList.push({ username: userName, profileUrl: userProfileUrl });
        return userList;
      }));
  }

}
