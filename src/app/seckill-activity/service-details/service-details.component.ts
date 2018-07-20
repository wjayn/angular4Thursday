import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml, Title} from '@angular/platform-browser';
import {flyIn} from '../../animationsVariable';
import {SwalComponent} from '@toverux/ngsweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {CarItemsList, CarSeller} from '../../entity/index';

declare var $: any;
declare var IosSelect: any;
@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  animations: [flyIn]
})
export class ServiceDetailsComponent implements OnInit {
  shade: boolean = false;
  isHaveBusiness: boolean = false;
  isHaveTime: boolean = false;
  htmlDateTime: string;
  isWeekend: boolean;
  timeNum: string;
  _phone: string;
  @ViewChild('dialog') private swalDialog: SwalComponent;
  goods: CarItemsList;
  business: CarSeller;
  oilExplainHtml: SafeHtml;

  constructor(private title: Title,
              private router: Router,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.title.setTitle('详情服务');
    document.body.style.background = '#fff';
    this.getDateTime();
    this.goods = JSON.parse(localStorage.getItem('automobileServiceGoods'));
    console.log(this.goods);
    this.oilExplainHtml = this.domSanitizer.bypassSecurityTrustHtml(this.goods.description);
  }
  numberToFixed(num: any): number {
    return num.toFixed(2);
  }
  /**
   * 点击选择商家
   */
  selectBusiness(): void {
    this.shade = true;
  }

  /**
   * 取选中的下标的值
   * @param index
   */
  onVoted(index: number): void {
    console.log(index);
    this.shade = false;
    this.business = this.goods.seller[index];
    this.isHaveBusiness = true;
  }

  /**
   * 取子路由关闭shade事件返回的值
   * @param shade
   */
  onShade(shade: boolean): void {
    this.shade = shade;
  }

  /**
   * 点击立即抢购
   */
  onSubmit() {
    const timeNum = Number(this.timeNum.split(',')[0]);
    const timeType = this.timeNum.split(',')[1];
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!this.isWeekend) {
      this.setSwalDialogError('不在工作日范围内！', '当前选择时间非监测站正常上班时间（周一至周五9:00-18:00）');
    } else if (!myreg.test(this._phone)) {
      this.setSwalDialogError('', '请输入正确的手机号');
    } else if (timeNum <= new Date().getTime()) {
      // console.log(timeNum);
      // console.log(new Date().getTime());
      this.setSwalDialogError('', '预约失败（预约时间已过期）');
    } else {
      this.router.navigate(['/seckill/carPayment', {
        'sellerId': this.business.id,
        'reserveTime': timeType,
        'reserveMobile': this._phone
      }]);
    }
  }

  /**
   * 选择预约时间
   */
  getDateTime(): void {
    const that = this;
    const selectDateDom = $('#selectDate');
    const showDateDom = $('#showDate');

    // 初始化时间
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDate = now.getDate();
    // showDateDom.attr('data-year', nowYear);
    // showDateDom.attr('data-month', nowMonth);
    // showDateDom.attr('data-date', nowDate);

    // 数据初始化
    function formatYear(_nowYear: number) {
      const arr = [];
      for (let i = _nowYear; i <= _nowYear + 1; i++) {
        arr.push({
          id: i + '',
          value: i + '年'
        });
      }
      return arr;
    }

    function formatMonth(_nowMonth: number) {
      const arr = [];
      for (let i = _nowMonth; i <= 12; i++) {
        arr.push({
          id: i + '',
          value: i + '月'
        });
      }
      return arr;
    }

    function formatDate(_nowDate: number, count: number) {
      const arr = [];
      for (let i = _nowDate; i <= count; i++) {
        arr.push({
          id: i + '',
          value: i + '日'
        });
      }
      return arr;
    }

    const yearData = function (callback) {
      callback(formatYear(nowYear));
    };
    const monthData = function (year, callback) {
      if (year == nowYear) {
        callback(formatMonth(nowMonth));
      } else {
        callback(formatMonth(1));
      }

    };
    const dateData = function (year, month, callback) {
      let _nowDate = 1;
      if (year == nowYear && month == nowMonth) {
        _nowDate = nowDate;
      }
      if (/^(1|3|5|7|8|10|12)$/.test(month)) {
        callback(formatDate(_nowDate, 31));
      } else if (/^(4|6|9|11)$/.test(month)) {
        callback(formatDate(_nowDate, 30));
      } else if (/^2$/.test(month)) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
          callback(formatDate(_nowDate, 29));
        } else {
          callback(formatDate(_nowDate, 28));
        }
      } else {
        throw new Error('month is illegal');
      }
      // if (/^(1|3|5|7|8|10|12)$/.test(month)) {
      //   callback(formatDate(31));
      // } else if (/^(4|6|9|11)$/.test(month)) {
      //   callback(formatDate(30));
      // } else if (/^2$/.test(month)) {
      //   if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      //     callback(formatDate(29));
      //   } else {
      //     callback(formatDate(28));
      //   }
      // } else {
      //   throw new Error('month is illegal');
      // }
    };
    const hourData = function (one, two, three, callback) {
      const hours = [];
      for (let i = 9, len = 18; i < len; i++) {
        hours.push({
          id: i,
          value: i + '时'
        });
      }
      callback(hours);
    };
    const minuteData = function (one, two, three, four, callback) {
      const minutes = [];
      for (let i = 0, len = 60; i < len; i++) {
        minutes.push({
          id: i,
          value: i + '分'
        });
      }
      callback(minutes);
    };

    selectDateDom.bind('click', function () {
      // const oneLevelId = showDateDom.attr('data-year');
      // const twoLevelId = showDateDom.attr('data-month');
      // const threeLevelId = showDateDom.attr('data-date');
      const oneLevelId = nowYear;
      const twoLevelId = nowMonth;
      const threeLevelId = nowDate;
      const fourLevelId = showDateDom.attr('data-hour');
      const fiveLevelId = showDateDom.attr('data-minute');
      const iosSelect = new IosSelect(5,
        [yearData, monthData, dateData, hourData, minuteData],
        {
          title: '',
          itemHeight: 35,
          itemShowCount: 9,
          oneLevelId: oneLevelId,
          twoLevelId: twoLevelId,
          threeLevelId: threeLevelId,
          fourLevelId: fourLevelId,
          fiveLevelId: fiveLevelId,
          callback: function (selectOneObj, selectTwoObj, selectThreeObj, selectFourObj, selectFiveObj) {
            showDateDom.attr('data-year', selectOneObj.id);
            showDateDom.attr('data-month', selectTwoObj.id);
            showDateDom.attr('data-date', selectThreeObj.id);
            showDateDom.attr('data-hour', selectFourObj.id);
            showDateDom.attr('data-minute', selectFiveObj.id);
            that.htmlDateTime = selectOneObj.value + selectTwoObj.value + selectThreeObj.value + selectFourObj.value + selectFiveObj.value
            showDateDom.html(that.htmlDateTime);
            that.isHaveTime = true;
            if (selectTwoObj.id < 10) {
              selectTwoObj.id = '0' + selectTwoObj.id;
            }
            if (selectThreeObj.id < 10) {
              selectThreeObj.id = '0' + selectThreeObj.id;
            }
            if (selectFourObj.id < 10) {
              selectFourObj.id = '0' + selectFourObj.id;
            }
            if (selectFiveObj.id < 10) {
              selectFiveObj.id = '0' + selectFiveObj.id;
            }
            const timeStr = selectOneObj.id + selectTwoObj.id + selectThreeObj.id + selectFourObj.id + selectFiveObj.id;
            that.timeNum = that.getDateNumber(timeStr);
            // that.timeType = that.getDateType(timeStr);
            const newDate = new Date(that.timeNum);
            if (newDate.getDay() === 0) {
              that.isWeekend = false;
            } else if (newDate.getDay() === 6) {
              that.isWeekend = false;
            } else {
              that.isWeekend = true;
            }
          }
        });
    });
  }

  getDateNumber(dateTime: string): string {
    const year = dateTime.substring(0, 4);
    const month = dateTime.substring(4, 6);
    const day = dateTime.substring(6, 8);
    const hour = dateTime.substring(8, 10);
    const minute = dateTime.substring(10, 12);
    const time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00';
    return Date.parse(`${new Date(time)}`) + ',' + time;
  }


  /**
   * 弹框
   * @param title
   * @param text
   */
  setSwalDialogError(title: string, text: string): void {
    this.swalDialog.title = title;
    this.swalDialog.text = text;
    // this.swalDialog.type = 'info';
    this.swalDialog.options = {
      'confirmButtonColor': '#50AFDF',
      'confirmButtonText': '确认'
    };
    this.swalDialog.confirm.subscribe(() => {
    });
    this.swalDialog.show();
  }
}
