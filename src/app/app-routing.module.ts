import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { MovieComponent } from './movie/movie.component';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
    path : '',
    redirectTo : '/dashboard',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate: [AuthGuard]

  },
  {
    path : 'users',
    component : UserComponent,
    canActivate: [AuthGuard]

  },
  {
    path : 'movies',
    component : MovieComponent,
    canActivate: [AuthGuard]

  },
  {
    path : 'import',
    component : ImportCsvComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
