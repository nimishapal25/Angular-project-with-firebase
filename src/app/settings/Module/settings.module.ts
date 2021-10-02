import { NgModule } from '@angular/core';
import { UpdateUserComponent } from '../components/update-user/update-user.component';
import { SharedModule } from '../../shared/Module/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    UpdateUserComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    MatCardModule
  ],
})
export class SettingsModule { }
