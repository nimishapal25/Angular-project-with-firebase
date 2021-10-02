import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth/signup', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/Module/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./settings/Module/settings.module').then(m => m.SettingsModule),
  },

  {
    path: 'home',
    loadChildren: () => import('./home/Module/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
