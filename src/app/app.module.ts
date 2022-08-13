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
import { WhishlistComponent } from './userprofile/whishlist/whishlist.component';
import { ReviewsComponent } from './userprofile/reviews/reviews.component';
import { HistoryComponent } from './userprofile/history/history.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './dashboard/login/login.component';
import { AllordersComponent } from './dashboard/allorders/allorders.component';
import { AddorderComponent } from './dashboard/addorder/addorder.component';
import { EditorderComponent } from './dashboard/editorder/editorder.component';
import { AlloffersComponent } from './dashboard/alloffers/alloffers.component';
import { AddofferComponent } from './dashboard/addoffer/addoffer.component';
import { AllreviewComponent } from './dashboard/allreview/allreview.component';
import { AlluserComponent } from './dashboard/alluser/alluser.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { CategoryproductsComponent } from './categoryproducts/categoryproducts.component';

import { EditofferComponent } from './dashboard/editoffer/editoffer.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

import { MainnavbarComponent } from './mainnavbar/mainnavbar.component';

import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { RecoveryInstructionsComponent } from './recovery-instructions/recovery-instructions.component';
import { OrderdetailsComponent } from './userprofile/orderdetails/orderdetails.component';
import { RateComponent } from './userprofile/rate/rate.component';




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
    WhishlistComponent,
    ReviewsComponent,
    HistoryComponent,
    RecentlyViewedComponent,
    CartComponent,
    LoginComponent,
    AllordersComponent,
    AddorderComponent,
    EditorderComponent,
    AlloffersComponent,
    AddofferComponent,
    AllreviewComponent,
    AlluserComponent,
    CheckoutComponent,

    CategoryproductsComponent,

    EditofferComponent,
      ProductdetailsComponent,
      NavbarComponent,
      VerificationCodeComponent,

      MainnavbarComponent,

      ForgetpasswordComponent,
      UpdatepasswordComponent,
      RecoveryInstructionsComponent,
      OrderdetailsComponent,
      RateComponent,
      


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
