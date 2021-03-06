import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// Cấu hình Routing 
import {Routes,RouterModule} from '@angular/router';
import { HomeModule } from './Modules/home/home.module';
import { UserModule } from './Modules/user/user.module';
//Gọi API
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { CourseService } from './_core/services/course.service';
import { JwtInterceptor } from './_core/guard/jwt.interceptor';

const appRoutes:Routes =[
  // Load ra modules tương ứng
  {path:'home',loadChildren: ()=> HomeModule},
  {path:'user',loadChildren: ()=> UserModule},
  {path:'',loadChildren: ()=>HomeModule}
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Router module này sẽ điều hướng cho thẻ <router-outlet></router-outlet> tại app Component
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [CourseService,{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}],//Provider là nơi import các service sử dụng cho module đó
  bootstrap: [AppComponent],
})
export class AppModule {}
