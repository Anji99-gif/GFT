import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PartyManagementComponent } from './party-management/party-management.component';
import { PartyListComponent } from './party-list/party-list.component';
import { PartyFormComponent } from './party-form/party-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartyService } from './party.service';
import { AuthInterceptor } from './auth.interceptor';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PartyManagementComponent,
    PartyListComponent,
    PartyFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot(),BrowserAnimationsModule, MatTableModule,MatButtonModule, MatToolbarModule,MatInputModule,MatCardModule,MatDialogModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule],
  providers: [PartyService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
