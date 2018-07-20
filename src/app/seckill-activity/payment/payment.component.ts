import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../../animationsVariable';
import {ActivatedRoute, Router} from '@angular/router';
import {IndexService} from '../../service/index.service';
import {environment} from '../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  animations: [flyIn]
})
export class PaymentComponent implements OnInit {
  activityId: string = '';
  disabled: boolean = false;
  isHaveLoad: boolean = false;
  btnText: string = '确认支付';
  itemId: string;
  salePrice: number;
  shopPrice: number;
  disCount: number;
  value: number = 106; // 106信用卡 ，107储蓄卡
  ua = window.navigator.userAgent.toLowerCase();
  reg = /MicroMessenger/i;


  card: string;
  telF: string;
  yzm: string;
  isTime: boolean = false;
  timer;
  second: number;
  xh: string;


  constructor(private activatedRoute: ActivatedRoute,
              private indexService: IndexService,
              private router: Router,
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
    $('#myModal').on('hidden.bs.modal', () => {
      this.disabled = false;
      this.btnText = '确认支付';
    });
  }

  numberToFixed(num: any): number {
    return num.toFixed(2);
  }

  /**
   * 查询是否认证信息卡
   */
  getAuth(): void {
    this.disabled = true;
    this.isHaveLoad = true;
    this.btnText = '请稍等...';
    this.indexService.checkIsAuth()
      .then(res => {
        if (res.result === 'YES') {
          this.addOilOrder();
        } else {
          this.isHaveLoad = false;
          $('#myModal').modal('show');
        }
      })
      .catch(() => {
        this.isHaveLoad = false;
        alert('当前访问人数过多，请稍后再试');
      });
  }

  /**
   * 交通安全信息卡认证
   */
  authMsg(): void {
    if (this.card == '' || this.card == null) {
      alert('请输入卡号');
      return;
    } else if (this.telF == '' || this.telF == null) {
      alert('请输入手机后四位');
      return;
    } else if (this.yzm == '' || this.yzm == null) {
      alert('请输入验证码');
      return;
    }
    this.indexService.authMsg(this.card, this.xh, this.telF, this.yzm)
      .then(res => {
        $('#myModal').modal('hide');
        this.addOilOrder();
      })
      .catch(res => {
        const _error = JSON.parse(res._body);
        if (_error.code === 'INVALID_VERIFY.NotRule') {
          alert('验证码错误');
          return;
        } else if (_error.code === 'infoCardIsBind.NotRule') {
          alert('您的信息卡已认证过，请勿重复认证');
          return;
        }
        alert('当前访问人数过多，请稍后再试');
      });
  }

  /**
   * 获取验证码
   */
  getCode(): void {
    if (this.card == '' || this.card == null) {
      alert('请输入卡号');
      return;
    } else if (this.telF == '' || this.telF == null) {
      alert('请输入手机后四位');
      return;
    }

    this.indexService.sendAuthMsg(this.card, this.telF)
      .then(res => {
        console.log(res);
        this.toShowTime();
        this.xh = res.xh;
      })
      .catch(res => {
        const _error = JSON.parse(res._body);
        if (_error.code === '卡号不存在.NotRule') {
          alert('卡号不存在，请重新输入');
          return;
        } else if (_error.code === '手机后四位不一致.NotRule') {
          alert('手机后四位不一致，请重新输入');
          return;
        }

        alert('当前访问人数过多，请稍后再试');
      });
  }

  /**
   * 显示倒计时
   */
  toShowTime(): void {
    this.isTime = true;
    this.second = 60;
    // 每一秒更新时间
    this.timer = setInterval(() => {
      this.second--;
      if (this.second === 0) {
        clearInterval(this.timer);
        this.isTime = false;
      }
    }, 1000);
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
          alert('您本月已经参加过本活动，请多留意优驾行，福利多多');
          history.go(-2);
        } else if (errorMsg.code === 'haveNotPay.order.NotRule') {
          alert('您已提交过订单 请前往个人中心我的订单进行支付或取消订单');
          // location.href = 'https://mobile.sxwinstar.net/ccb/web/user/index';
          // location.href = '/ccb/user/index';
          location.href = environment.userPhpUrl;
        } else if (errorMsg.code === 'notBindInfoCard.order.NotRule') {
          alert('未认证交通安全信息卡，请先认证');
          $('#myModal').modal('show');
        } else if (errorMsg.code === 'soldOut.order.NotRule') {
          alert('此面值加油券已售罄，请选择其他面值的加油券。');
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
    const subBankCode = '';
    location.href = `${paymentUrl}?bankCode=${bankCode}&frontEndUrl=${frontEndUrl}&orderNumber=${orderNumber}` +
      `&paymentType=${paymentType}&subBankCode=${subBankCode}`;
  }

}
