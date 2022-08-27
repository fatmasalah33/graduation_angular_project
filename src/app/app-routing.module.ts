import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorypageComponent } from './categorypage/categorypage.component';
import { AddproductComponent } from './dashboard/addproduct/addproduct.component';
import { AllproductsComponent } from './dashboard/allproducts/allproducts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditproductComponent } from './dashboard/editproduct/editproduct.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AccountdetailsComponent } from './userprofile/accountdetails/accountdetails.component';
import { ChpasswordComponent } from './userprofile/chpassword/chpassword.component';
import { OrderdetailsComponent } from './userprofile/orderdetails/orderdetails.component';
import { MyordersComponent } from './userprofile/myorders/myorders.component';
import { RateComponent } from './userprofile/rate/rate.component';
import { AllcatogeryComponent } from './dashboard/allcatogery/allcatogery.component';
import { AddcatogeryComponent } from './dashboard/addcatogery/addcatogery.component';
import { EditcatogeryComponent } from './dashboard/editcatogery/editcatogery.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { ParentcategoryComponent } from './parentcategory/parentcategory.component';
import { WhishlistComponent } from './userprofile/whishlist/whishlist.component';
import { ReviewsComponent } from './userprofile/reviews/reviews.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './dashboard/login/login.component';
 import { AllordersComponent } from './dashboard/allorders/allorders.component';
// import { AddorderComponent } from './dashboard/addorder/addorder.component';
import { EditorderComponent } from './dashboard/editorder/editorder.component';
import { AlloffersComponent } from './dashboard/alloffers/alloffers.component';
import { AddofferComponent } from './dashboard/addoffer/addoffer.component';
import { AllreviewComponent } from './dashboard/allreview/allreview.component';
import { AlluserComponent } from './dashboard/alluser/alluser.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FAQComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';

import { CategoryproductsComponent } from './categoryproducts/categoryproducts.component';

import { EditofferComponent } from './dashboard/editoffer/editoffer.component';
import { DashboardGuardGuard } from './dashboard-guard.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { RecoveryInstructionsComponent } from './recovery-instructions/recovery-instructions.component';
import { PendingproductComponent } from './dashboard/pendingproduct/pendingproduct.component';
import { SellerComponent } from './seller/seller.component';
import { VerifiedProductComponent } from './seller/verified-product/verified-product.component';
import { NotVerifiedProductComponent } from './seller/not-verified-product/not-verified-product.component';
import { AddproductsellerComponent } from './seller/addproductseller/addproductseller.component';
import { SellerGuard } from './seller.guard';
import { AddoffersellerComponent } from './seller/addofferseller/addofferseller.component';
import { AlloffersellerComponent } from './seller/allofferseller/allofferseller.component';
import { ProfileComponent } from './seller/profile/profile.component';
import { CheckoutsellerComponent } from './seller/checkoutseller/checkoutseller.component';
import { EditoffersellerComponent } from './seller/editofferseller/editofferseller.component';
import { SaleComponent } from './sale/sale.component';
import { ConfirmedOrderComponent } from './confirmed-order/confirmed-order.component';
import { BestsellerComponent } from './bestseller/bestseller.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';

import { OpenOrdersComponent } from './userprofile/myorders/open-orders/open-orders.component';
import { ClosedOrdersComponent } from './userprofile/myorders/closed-orders/closed-orders.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SizesComponent } from './dashboard/sizes/sizes.component';
import { AddsizeComponent } from './dashboard/addsize/addsize.component';


import { PaymentComponent } from './payment/payment.component';
import { AddressbookComponent } from './userprofile/addressbook/addressbook.component';
import { AddAddressComponent } from './userprofile/add-address/add-address.component';
import { EditAddressComponent } from './userprofile/edit-address/edit-address.component';


const routes: Routes = [
  { path: '', component: HomeHeaderComponent,
  children: [
    { path: '', component: HomeComponent},
  { path: 'categorypage/:name/:id', component: CategorypageComponent },
  { path: 'parentcategory', component: ParentcategoryComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'bestseller', component:  BestsellerComponent },
  { path: 'terms-of-use', component:  TermsOfUseComponent },
  { path: 'signin/register', component: RegisterComponent },
  { path: 'verificationcode' , component:VerificationCodeComponent},
  { path: 'cart', component: CartComponent, canActivate:[AuthGuardGuard] },
  { path: 'cart/checkout', component: CheckoutComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signin/forgetpassword', component: ForgetpasswordComponent },
  { path: 'recoveryInstructions', component: RecoveryInstructionsComponent },
  { path: 'updatepassword/:id', component: UpdatepasswordComponent },
  { path: 'categoryproducts/:id', component: CategoryproductsComponent },
  { path: 'productdetails/:id', component: ProductdetailsComponent },
  { path: 'history', component: RecentlyViewedComponent },
  { path: 'track-order', component: TrackOrderComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'cancel-order', component: CancelOrderComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'About-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },

  { path: 'confirmed-order', component: ConfirmedOrderComponent },
  { path: 'FAQ', component: FAQComponent },

  { path: 'cart/checkout/confirmed-order', component: ConfirmedOrderComponent },
  { path: 'cart/checkout/payment/:id', component: PaymentComponent },
 { path: 'userprofile', component: UserprofileComponent, canActivate:[AuthGuardGuard],
  children: [
    {path:'',component: AccountdetailsComponent},
    {path: 'accountdetails',component:AccountdetailsComponent},
    {path: 'addressbook',component:AddressbookComponent},
    {path: 'addressbook/addaddress',component:AddAddressComponent},
    {path: 'addressbook/edit/:id',component:EditAddressComponent},
    {path: 'chpassword',component:ChpasswordComponent},
    {path: 'myorders',component:MyordersComponent,
    children: [
      {path:'',component:OpenOrdersComponent },
      {path: 'open-orders',component:OpenOrdersComponent},
      {path: 'closed-orders',component:ClosedOrdersComponent },
    ],},
    {path: 'rate/:id/:order_id',component:RateComponent},
    {path: 'orderdetails',component:OrderdetailsComponent},

    {path: 'orderdetails/:id',component:OrderdetailsComponent},

    {path: 'Wishlist',component:WhishlistComponent},
    {path: 'reviews',component:ReviewsComponent},
  ], }
  ]},
  { path: 'seller', component: SellerComponent,canActivate:[SellerGuard],
  children: [
    {path:'',component:VerifiedProductComponent},
    {path: 'verifiedProduct',component:VerifiedProductComponent},
    {path:'notVerifiedProduct',component:NotVerifiedProductComponent},
    {path:'alloffer',component:AlloffersellerComponent},
    {path:'alloffer/edit/:id',component:EditoffersellerComponent},
    {path:'alloffer/addoffer',component:AddoffersellerComponent},
    {path:'addproduct',component:AddproductsellerComponent },
    {path:'profile',component:ProfileComponent },
    {path:'checkoutseller',component:CheckoutsellerComponent }
  ], },
  { path: 'dashboard', component: DashboardComponent,canActivate:[DashboardGuardGuard],
  children: [
    {path:'',component:AllproductsComponent},
    {path: 'allproduct',component:AllproductsComponent},
    {path:'allproduct/addproduct',component:AddproductComponent},
    {path:'allproduct/edit/:id',component:EditproductComponent},
    {path:'allcatogery',component:AllcatogeryComponent},
    {path:'allcatogery/edit/:id',component:EditcatogeryComponent},
    {path:'allcatogery/addcatogery',component:AddcatogeryComponent},
    {path:'allorder',component:AllordersComponent},
    {path:'allorder/edit/:id',component:EditorderComponent},
    {path:'alloffer/edit/:id',component:EditofferComponent},
    {path:'alloffer',component:AlloffersComponent},
    {path:'alloffer/addoffer',component:AddofferComponent},
    {path:'allreview',component:AllreviewComponent},
    {path:'alluser',component:AlluserComponent},
    {path:'pendingproduct',component:PendingproductComponent},
   {path:'sizes',component:SizesComponent},
   {path:'sizes/addsize',component:AddsizeComponent}
  ], },
  {path:'login',component:LoginComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
