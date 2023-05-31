import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AwardsComponent } from './awards/awards.component';
import { ProjectsComponent } from './projects/projects.component';
import { CalenderComponent } from './calender/calender.component';
import { ReportsComponent } from './reports/reports.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentComponent } from './payment/payment.component';
import { WindowRefService } from './window-ref.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    StudentDetailsComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    AwardsComponent,
    ProjectsComponent,
    CalenderComponent,
    ReportsComponent,
    UserProfileComponent,
    NavComponent,
    MainComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      toastComponent: ToastNoAnimation,
      preventDuplicates: true,
      closeButton: true,
      timeOut: 3000,
    }),
    ToastNoAnimationModule,
    
  ],
  providers: [WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
