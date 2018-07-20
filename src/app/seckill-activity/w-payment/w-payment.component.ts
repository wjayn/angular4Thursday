import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../../animationsVariable';
import {IndexService} from '../../service/index.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-w-payment',
  templateUrl: './w-payment.component.html',
  styleUrls: ['./w-payment.component.scss'],
  animations: [flyIn]
})
export class WPaymentComponent implements OnInit {
  activityId: string = '';
  disabled: boolean = false;
  isHaveLoad: boolean = false;
  btnText: string = '确认支付';
  itemId: string;
  salePrice: number;
  shopPrice: number;
  disCount: number;
  img1: string = './assets/images/xuan.png';
  img2: string = './assets/images/unxuan.jpg';
  value: number = 106;
  discount: number = 0;
  ua = window.navigator.userAgent.toLowerCase();
  reg = /MicroMessenger/i;


  constructor(private indexService: IndexService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('订单确认');
    this.activatedRoute.params.subscribe(res => {
      console.log(res);
      this.itemId = res.id;
      this.salePrice = Number(res.salePrice);
      this.shopPrice = Number(res.shopPrice);
      this.activityId = res.activityId;
      this.disCount = res.disCount;
    });
  }

  numberToFixed(num: any): number {
    return num.toFixed(2);
  }
  /**
   * 添加订单
   */
  addOilOrder(): void {
    this.isHaveLoad = true;
    this.btnText = '请稍后';
    this.disabled = true;
    this.indexService.addOilOrder(this.activityId, this.itemId)
      .then(res => {
        console.log(res);
        alert('请点击“OK”进行支付，如未完成支付，请在半小时内到“客户中心-个人中心-我的订单”中进行查看支付。');
        // const parameters = JSON.stringify({'activityId': this.activityId, 'salePrice': this.shopPrice});
        // localStorage.removeItem('ccb_parameters');
        // localStorage.setItem('ccb_parameters', parameters);
        this.goPayment(res.serialNumber, this.value);
      })
      .catch((res) => {
        this.disabled = false;
        this.isHaveLoad = false;
        this.btnText = '确认支付';
        const errorMsg = JSON.parse(res._body);
        if (errorMsg.code === 'oneMonthOnce.order.NotRule') {
          alert('您本周已经参加过本活动，请多留意优驾行，福利多多');
          history.go(-2);
        } else if (errorMsg.code === 'haveNotPay.order.NotRule') {
          alert('您已提交过订单 请前往个人中心我的订单进行支付或取消订单');
          // location.href = 'https://mobile.sxwinstar.net/ccb/web/user/index';
          // location.href = '/ccb/user/index';
          location.href = environment.userPhpUrl;
        } else if (errorMsg.code === 'soldOut.order.NotRule') {
          alert('此面值加油券已售罄，请选择其他面值的加油券。');
          history.go(-2);
          return;
        } else if (errorMsg.code === 'justOnce.earlyAndEveningMarket.NotRule') {
          alert('该活动每天只能购买一次。');
          history.go(-2);
          return;
        } else if (errorMsg.code === 'eveningMarketNotStarted.NotRule') {
          alert('晚市还没开始，请选择其他商品。');
          history.go(-2);
          return;
        } else if (errorMsg.code === 'earlyMarketNotStarted.NotRule') {
          alert('早市还没开始，请选择其他商品。');
          history.go(-2);
          return;
        } else {
          alert('当前访问人数过多，请稍后再试！');
        }
      });
  }

  /**
   * 跳确认支付
   * @param orderNumber
   * @param bankCode
   */
  goPayment(orderNumber: string, bankCode: number) {
    // const frontEndUrl = `https://mobile.sxwinstar.net/ccb/thursdaySuccess/thursdayPaySuccess.php`;
    // const paymentUrl = 'https://mobile.sxwinstar.net/wechat/payment/ccbPay.html';
    const frontEndUrl = environment.frontEndUrl;
    const paymentUrl = environment.paymentUrl;
    const paymentType = '1';
    let subBankCode;
    if (bankCode === 991) {
      if (this.reg.test(this.ua)) {
        subBankCode = 201;
        console.log(subBankCode);
      } else {
        subBankCode = 202;
        console.log(subBankCode);
      }
    } else if (bankCode === 992) {
      subBankCode = 301;
      console.log(subBankCode);
    }
    location.href = `${paymentUrl}?bankCode=${bankCode}&frontEndUrl=${frontEndUrl}&orderNumber=${orderNumber}` +
      `&paymentType=${paymentType}&subBankCode=${subBankCode}`;
  }

  /**
   * 修改选中图片
   *
   */
  changeImg1(): void {
    this.value = 106;
    this.img1 = './assets/images/xuan.png';
    this.img2 = './assets/images/unxuan.jpg';
  }

  changeImg2(): void {
    this.value = 991;
    this.img2 = './assets/images/xuan.png';
    this.img1 = './assets/images/unxuan.jpg';
  }
}
