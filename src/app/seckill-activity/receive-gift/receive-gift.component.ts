import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../../animationsVariable';
import {ActivatedRoute, Router} from '@angular/router';
import {IndexService} from '../../service/index.service';
import {SwalComponent} from '@toverux/ngsweetalert2';
@Component({
  selector: 'app-receive-gift',
  templateUrl: './receive-gift.component.html',
  styleUrls: ['./receive-gift.component.scss'],
  animations: [flyIn]
})
export class ReceiveGiftComponent implements OnInit {
  _name: string;
  _phone: string;
  _number: string;
  _plateNumber: string;
  activityId: string;
  type: string;
  nameReg = /^[\u4e00-\u9fa5]{2,10}$/i;
  phoneReg = /^1[34578]\d{9}$/;
  plateNumberReg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
  isButtonDis: boolean = false;
  buttonTex: string = '提交';
  @ViewChild('dialog') private swalDialog: SwalComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private title: Title,
              private indexService: IndexService) {

  }

  ngOnInit() {
    this.title.setTitle('赠品领取');
    document.body.style.backgroundColor = '#FFE3E1';
    this.activatedRoute.queryParams.subscribe(res => {
      this.activityId = res.activityId;
      this.type = res.type;
    });
  }


  //  信息确认弹出层
  setSwalDialog(title: string, text: string): void {
    this.swalDialog.title = title;
    this.swalDialog.text = text;
    this.swalDialog.type = 'error';
    this.swalDialog.options = {
      'confirmButtonColor': '#3CA8D9',
      'confirmButtonText': '确认',
    };
    this.swalDialog.confirm.subscribe(() => {
    });
    this.swalDialog.show();
  }

  /**
   * checked校验
   * @param name
   * @param phone
   * @param plateNumber
   * @returns {boolean}
   */
  checkInput(name: string, phone: string, plateNumber: string) {
    if (!this.nameReg.test(name)) {
      this.setSwalDialog('', '请填写正确的姓名');
      return false;
    }
    if (!this.phoneReg.test(phone)) {
      this.setSwalDialog('', '请填写正确的手机号码');
      return false;
    }
    if (!this.plateNumberReg.test(plateNumber.toUpperCase())) {
      this.setSwalDialog('', '请填写正确的车牌号');
      return false;
    }
    return true;
  }


  /**
   * 提交
   * @param name
   * @param phone
   * @param plateNumber
   */
  submit(name: string, phone: string, plateNumber: string): void {
    if (this.checkInput(name, phone, plateNumber)) {
      this.indexService.submitVoucher(name, phone, plateNumber.toUpperCase(), this.activityId, this.type)
        .then(() => {
          this.router.navigate(['/seckill/success', {'type': this.type}]);
        })
        .catch(response => {
          console.log(response);
          const errorMsg = JSON.parse(response._body);
          if (errorMsg.code === 'getCareCoupons.isGet.NotFound') {
            this.setSwalDialog('', '您已领取过该券，无法再次领取！');
          } else if (errorMsg.code === 'getCareCoupons.isOut.NotRule') {
            this.buttonTex = '今日已领完';
            this.isButtonDis = true;
          } else {
            this.setSwalDialog('', '服务器繁忙，请稍候再试');
          }
        });
    }
  }

  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
