import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ActivityComponent} from './activity/activity.component';
import {ReceiveGiftComponent} from './receive-gift/receive-gift.component';
import {ReceiveSuccessComponent} from './receive-success/receive-success.component';
import {PaymentComponent} from './payment/payment.component';
import {WPaymentComponent} from './w-payment/w-payment.component';
import {AutomobileServiceComponent} from './automobile-service/automobile-service.component';
import {ServiceDetailsComponent} from './service-details/service-details.component';
import {ServiceBusinessComponent} from './service-details/service-business/service-business.component';
import {CarPaymentComponent} from './car-payment/car-payment.component';
import {MorningEveningMarketComponent} from './morning-evening-market/morning-evening-market.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'index'},
  {path: 'index', component: IndexComponent},
  {path: 'meMarket', component: MorningEveningMarketComponent},
  {path: 'activity', component: ActivityComponent},
  {path: 'car', component: AutomobileServiceComponent},
  {path: 'serviceDetails', component: ServiceDetailsComponent},
  {path: 'business', component: ServiceBusinessComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'wPayment', component: WPaymentComponent},
  {path: 'carPayment', component: CarPaymentComponent},
  {path: 'receive', component: ReceiveGiftComponent},
  {path: 'success', component: ReceiveSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeckillActivityRoutingModule {
}
