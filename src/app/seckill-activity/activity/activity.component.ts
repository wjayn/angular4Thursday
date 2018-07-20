import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../../animationsVariable';
import {SwalComponent} from '@toverux/ngsweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {IndexService} from '../../service/index.service';
import {Money} from '../../entity/index';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  animations: [flyIn]
})
export class ActivityComponent implements OnInit {
  moneys: Money[];
  @ViewChild('dialog') swalDialog: SwalComponent;
  isHaveLoad: boolean = false;
  activityId: number = 1;
  id: string;
  salePrice: number;
  shopPrice: number;
  disCount: number;
  couponId: string = '';
  amount: number = 0;
  isSale: number;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private indexService: IndexService,
              private location: Location,
              private title: Title) {
  }

  ngOnInit() {
    this.isHaveLoad = true;
    this.title.setTitle('加油券');
    document.body.style.backgroundColor = '#fff';
    this.activatedRoute.queryParams.subscribe(res => {
      console.log(res);
      this.activityId = Number(res.activityId);
      this.getMoney(this.activityId);
    });
  }

  numberToFixed(num: any): number {
    return num.toFixed(2);
  }

  /**
   *  获取加油券金额列表
   */
  getMoney(activityId: number): void {
    this.indexService.getMoney(activityId)
      .then(res => {
        this.isHaveLoad = false;
        this.moneys = res;
        console.log(res);
        if (res[0].isSale === 0) {
          this.id = res[0].id;
          this.salePrice = res[0].saledPrice;
          this.shopPrice = res[0].price;
          this.disCount = res[0].disCount;
        } else {
          this.id = '';
          this.salePrice = 0;
          this.shopPrice = 0;
          this.disCount = 0;
        }
      })
      .catch(res => {
        this.isHaveLoad = false;
        if (res.status == 401) {
          this.indexService.getTokenId(localStorage.getItem('headimgurl'),
            localStorage.getItem('nickname'),
            localStorage.getItem('openid'))
            .then(res => {
              localStorage.setItem('ccbToken', res.tokenId);
              alert('登录状态失效，请重新登录');
              // location.href = 'https://mobile.sxwinstar.net/ccb/ccb-php/index.php?type=callback&menu=thursday';
              // location.href = '/php-api/wechat_front/ccb/ccb-php/index.php?type=callback&menu=thursday';
              location.href = environment.thursdayPhpUrl;
            })
            .catch(res => {

            });
        } else {
          this.setSwalDialogError('当前访问人数过多，请稍后再试！');
        }
      });
  }

  /**
   * 保存传入的金额的信息
   * @param _id
   * @param _salePrice
   * @param _shopPrice
   * @param _disCount
   * @param _isSale
   */
  saveId(_id: string, _salePrice: number, _shopPrice: number, _disCount: number, _isSale: number): void {
    if (_isSale === 0) {
      this.id = _id;
      this.salePrice = _salePrice;
      this.shopPrice = _shopPrice;
      this.disCount = _disCount;
    } else {
      this.id = '';
      this.salePrice = 0;
      this.shopPrice = 0;
      this.disCount = 0;
    }
  }

  /**
   * 查看我的加油券
   */
  toLinkUser(): void {
    // location.href = 'https://mobile.sxwinstar.net/ccb/web/user/index';
    // location.href = '/ccb/user/index';
    location.href = environment.userPhpUrl;
  }

  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   *  立即购买
   */
  buy(): void {
    if (this.activityId === 201) {
      this.router.navigate(['/seckill/payment', {
        'id': this.id,
        'salePrice': this.salePrice,
        'shopPrice': this.shopPrice,
        'activityId': this.activityId,
        'disCount': this.disCount
      }]);
    } else {
      this.router.navigate(['/seckill/wPayment', {
        'id': this.id,
        'salePrice': this.salePrice,
        'shopPrice': this.shopPrice,
        'activityId': this.activityId,
        'disCount': this.disCount
      }]);
    }

  }

  /**
   * 弹出层
   * @param title
   */
  setSwalDialogError(title: string): void {
    this.swalDialog.title = title;
    this.swalDialog.options = {
      'confirmButtonColor': '#3ca8d9',
      'confirmButtonText': '确定'
    };
    this.swalDialog.show();
    this.swalDialog.confirm.subscribe(() => {
      this.location.back();
    });
    this.swalDialog.cancel.subscribe(() => {
      this.location.back();
    });
  }
}
