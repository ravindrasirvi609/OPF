import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'student-details', component: StudentDetailsComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ]),
  ],
  declarations: [

  ],
})
export class AppRoutingModule { }




