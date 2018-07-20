import {NgModule} from '@angular/core';
import {ShareModule} from '../share/share.module';
import {SeckillActivityRoutingModule} from './seckill-activity-routing.module';
import {IndexService} from '../service/index.service';

import {IndexComponent} from './index/index.component';
import {ActivityComponent} from './activity/activity.component';
import {ReceiveGiftComponent} from './receive-gift/receive-gift.component';
import {ReceiveSuccessComponent} from './receive-success/receive-success.component';
import {PaymentComponent} from './payment/payment.component';
import {WPaymentComponent} from './w-payment/w-payment.component';
import {AutomobileServiceComponent} from './automobile-service/automobile-service.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceBusinessComponent } from './service-details/service-business/service-business.component';
import { CarPaymentComponent } from './car-payment/car-payment.component';
import { MorningEveningMarketComponent } from './morning-evening-market/morning-evening-market.component';
@NgModule({
  imports: [
    ShareModule,
    SeckillActivityRoutingModule
  ],
  declarations: [
    IndexComponent,
    ActivityComponent,
    ReceiveGiftComponent,
    ReceiveSuccessComponent,
    PaymentComponent,
    WPaymentComponent,
    AutomobileServiceComponent,
    ServiceDetailsComponent,
    ServiceBusinessComponent,
    CarPaymentComponent,
    MorningEveningMarketComponent,
  ],
  providers: [IndexService]
})
export class SeckillActivityModule {
}
