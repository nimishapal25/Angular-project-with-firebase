import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from '../../home/components/sidenav/sidenav.component';
import { UpdateUserComponent } from '../components/update-user/update-user.component';

const routes: Routes = [
    { path: 'update/:id', component: UpdateUserComponent },
    { path: 'sidenav', component: SidenavComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }