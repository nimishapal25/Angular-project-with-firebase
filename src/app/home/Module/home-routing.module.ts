import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';

const routes: Routes = [
    {
        path: 'userprofile/:id', component: UserProfileComponent, children: [
            { path: 'detail/:prodId', component: ProductDetailComponent }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
