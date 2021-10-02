import { NgModule } from '@angular/core';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { SharedModule } from '../../shared/Module/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { MatCardModule } from '@angular/material/card';
import { SettingsModule } from '../../settings/Module/settings.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeProfileDialogComponent } from '../components/change-profile-dialog/change-profile-dialog.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    UserProfileComponent,
    SidenavComponent,
    AddProductComponent,
    ProductListComponent,
    ChangeProfileDialogComponent,
    ProductDetailComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    SettingsModule,
    MatMenuModule,
    MatDialogModule,
    MatBadgeModule,
    MatGridListModule
  ],
})
export class HomeModule { }
