import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './@core/service/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./user/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'update/:id',
    loadChildren: () =>
      import('./user/update/update.module').then((m) => m.UpdateModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./user/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'admin',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./admin/sidebar/sidebar.module').then((m) => m.SidebarModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
