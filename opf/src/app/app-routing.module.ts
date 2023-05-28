import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { AwardsComponent } from './awards/awards.component';
import { CalenderComponent } from './calender/calender.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent},
      { path: 'Calendar', component: CalenderComponent},
      { path: 'Projects', component: ProjectsComponent},
      { path: 'Reports', component: ReportsComponent},
      { path: 'awards', component: AwardsComponent},
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'student-details', component: StudentDetailsComponent },
      { path: 'UserProfile', component: UserProfileComponent},
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ]),
  ],
  declarations: [

  ],
})
export class AppRoutingModule { }




