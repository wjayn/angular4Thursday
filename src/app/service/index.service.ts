import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Money, AddOrder, MaintenanceVoucher, CarClassifyList, AddCarOrder} from '../entity/index';
import {environment} from '../../environments/environment';
@Injectable()
export class IndexService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'token_id': localStorage.getItem('ccbToken')
  });

  constructor(private http: Http) {
  }

  /**
   * 获取token
   * @param headImgUrl
   * @param nickName
   * @param openid
   * @returns {Promise<any|TResult2|TResult1>}
   */
  getTokenId(headImgUrl: string, nickName: string, openid: string): Promise<any> {
    return this.http.post(environment.getTokenUrl,
      {
        'headImgUrl': headImgUrl,
        'nickName': nickName,
        'openid': openid
      }, {headers: this.headers}
    )
      .toPromise()
      .then(res => res.json() as any)
      .catch(this._error);
  }

  /**
   * 获取商品列表
   * @param activityId
   * @returns {Promise<any|TResult2|Money[]>}
   */
  getMoney(activityId: number): Promise<Money[]> {
    const moneyUrl = `${environment.moneyUrl}?activityId=${activityId}`;
    return this.http.get(moneyUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Money[])
      .catch(this._error);
  }

  /**
   * 添加订单
   * @param activityId
   * @param couponId
   * @param itemId
   * @returns {Promise<any|TResult2|AddOrder>}
   */
  addOilOrder(activityId: string, itemId: string): Promise<AddOrder> {
    const addOilOrderUrl = `${environment.addOilOrderUrl}?activityId=${activityId}&itemId=${itemId}`;
    return this.http.post(addOilOrderUrl, '', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as AddOrder)
      .catch(this._error);
  }

  /**
   * 发送绑定交通安全信息卡验证码
   * @param {string} infoCard
   * @param {string} phone
   * @returns {Promise<any>}
   */
  sendAuthMsg(infoCard: string, phone: string): Promise<any> {
    const sendAuthMsg = `${environment.sendAuthMsg}?infoCard=${infoCard}&phone=${phone}`;
    return this.http
      .post(sendAuthMsg, {}, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as any)
      .catch(this._error);
  }

  /**
   * 验证交通安全信息卡 并绑定
   * @param kh
   * @param xh
   * @param sjh
   * @param yzm
   * @returns {Promise<any|TResult2|TResult1>}
   */
  authMsg(kh: string, xh: string, sjh: string, yzm: string): Promise<any> {
    const authMsgUrl = `${environment.authMsgUrl}`;
    return this.http.post(authMsgUrl, {
      'kh': kh,
      'xh': xh,
      'sjh': sjh,
      'yzm': yzm
    }, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as any)
      .catch(this._error);
  }


  /**
   * 查询是否绑定交通安全信息卡
   * @returns {Promise<any|TResult2|TResult1>}
   */
  checkIsAuth(): Promise<any> {
    const checkIsAuthUrl = `${environment.checkIsAuthUrl}`;
    return this.http.get(checkIsAuthUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as any)
      .catch(this._error);
  }

  /**
   * 提交汽车养护券
   * @param status
   * @returns {Promise<MaintenanceVoucher>}
   */
  submitVoucher(name: string, phoneNumber: string, plateNumber: string, activityId: string, type: string): Promise<MaintenanceVoucher> {
    const voucherUrl = `${environment.receiveVoucher}?name=${name}&phoneNumber=${phoneNumber}&plateNumber=${plateNumber}&activityId=${activityId}&type=${type}`;
    return this.http.post(voucherUrl, '', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as MaintenanceVoucher)
      .catch(this._error);
  }

  /**
   * 汽车养护类别 及其类别下的商品
   * @returns {Promise<any|TResult2|CarClassifyList[]>}
   */
  getclassifyList(): Promise<CarClassifyList[]> {
    return this.http.get(environment.classifyUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as CarClassifyList[])
      .catch(this._error);
  }

  /**
   * 汽车养护 下单
   * @returns {Promise<any|TResult2|TResult1>}
   */
  addCarOrder(sellerId: string, itemId: string, reserveTime: string, reserveMobile: string): Promise<AddCarOrder> {
    return this.http.post(environment.addCarOrderUrl, {
      'sellerId': sellerId,
      'itemId': itemId,
      'reserveTime': reserveTime,
      'reserveMobile': reserveMobile
    }, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as AddCarOrder)
      .catch(this._error);
  }

  /**
   * 汽车养护 判断订单是否能够支付
   * @returns {Promise<any|TResult2|TResult1>}
   */
  judgeCarOrderd(orderSerial: string): Promise<AddCarOrder> {
    const judgeCarOrderdUrl = `${environment.judgeCarOrderdUrl}/${orderSerial}/serialNumber`;
    return this.http.get(judgeCarOrderdUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as AddCarOrder)
      .catch(this._error);
  }


  /**
   * 获取当前时间戳
   * @returns {Promise<TResult|TResult2|TResult1>}
   */
  getTime(): Promise<any> {
    return this.http.get(environment.getTimeUrl)
      .toPromise()
      .then(res => res.json() as any)
      .catch(this._error);
  }

  earlyAndEveningMarket(marketType: number): Promise<any> {
    const earlyAndEveningMarketUrl = `${environment.earlyAndEveningMarketUrl}/${marketType}/type`;
    return this.http.get(earlyAndEveningMarketUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as any)
      .catch(this._error);
  }

  /**
   * 异常
   * @param error 异常
   */
  private _error(error: any): Promise<any> {
    console.log('this error :', error);
    return Promise.reject(error.message || error);
  }

}
