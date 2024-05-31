import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyManagementComponent } from './party-management/party-management.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.gaurd';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'parties', component: PartyManagementComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
