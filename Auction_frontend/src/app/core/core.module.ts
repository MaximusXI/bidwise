import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { ServicesComponent } from './services/services.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginPageComponent, 
    SignupPageComponent,
    LandingPageComponent,
    ServicesComponent,
    AboutUsComponent],
  exports : [
    LandingPageComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class CoreModule { }
