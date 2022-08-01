import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { FooterComponent } from './footer/footer.component';
import { HomeHeaderComponent } from './home-header/home-header.component';

import { CategoryNavbarComponent } from './category-navbar/category-navbar.component';

import { CategorypageComponent } from './categorypage/categorypage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AllproductsComponent } from './dashboard/allproducts/allproducts.component';
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from './dashboard/addproduct/addproduct.component';
import { EditproductComponent } from './dashboard/editproduct/editproduct.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AccountdetailsComponent } from './userprofile/accountdetails/accountdetails.component';
import { ChpasswordComponent } from './userprofile/chpassword/chpassword.component';
import { MyordersComponent } from './userprofile/myorders/myorders.component';
import { AllcatogeryComponent } from './dashboard/allcatogery/allcatogery.component';
import { AddcatogeryComponent } from './dashboard/addcatogery/addcatogery.component';
import { EditcatogeryComponent } from './dashboard/editcatogery/editcatogery.component';
import { ParentcategoryComponent } from './parentcategory/parentcategory.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    SigninComponent,
    FooterComponent,
    HomeHeaderComponent,
    CategoryNavbarComponent,
    CategorypageComponent,
    NotFoundComponent,
    DashboardComponent,
    AllproductsComponent,
    HomeComponent,
    AddproductComponent,
    EditproductComponent,
    TrackOrderComponent,
    UserprofileComponent,
    AccountdetailsComponent,
    ChpasswordComponent,
    MyordersComponent,
    AllcatogeryComponent,
    AddcatogeryComponent,
    EditcatogeryComponent,
    ParentcategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
