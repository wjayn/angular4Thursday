import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../../animationsVariable';
import {IndexService} from '../../service/index.service';

declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [flyIn]
})
export class IndexComponent implements OnInit {

  isStart: boolean = true;
  startCountNumber: number = 0;

  constructor(private title: Title,
              private indexService: IndexService) {
  }

  ngOnInit() {
    this.title.setTitle('加油券秒杀');
    // document.body.style.backgroundColor = '#fc7a3e';
    document.body.style.backgroundColor = '#973955';
    this.getTime();
  }

  /**
   * 获取当前服务器时间，倒计时
   */
  getTime(): void {
    this.indexService.getTime()
      .then(res => {
        const now = new Date(Number(res.time)).getDay();
        if (now < 4) {
          this.isStart = false;
          this.startCountNumber = 4 - now;
        } else if (now > 4) {
          this.isStart = false;
          this.startCountNumber = 7 - (now - 4);
        } else {
          this.isStart = true;
        }
      })
      .catch(() => {
        alert('当前访问人数过多，请稍后再试！');
      });
  }

  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
