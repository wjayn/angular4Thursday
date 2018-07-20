import {Component, OnInit, OnDestroy} from '@angular/core';
import {flyIn} from '../../animationsVariable';
import {IndexService} from '../../service/index.service';

@Component({
  selector: 'app-morning-evening-market',
  templateUrl: './morning-evening-market.component.html',
  styleUrls: ['./morning-evening-market.component.scss'],
  animations: [flyIn]
})
//activeType 商品:1:秒杀  0：正常  9：早市   10：晚市
export class MorningEveningMarketComponent implements OnInit, OnDestroy {
  earlyMarketTime: string;
  eveningMarketTime: string;
  earlyStart: boolean;
  eveningStart: boolean;
  earlyInterval: any;
  eveningInterval: any;
  isHaveLoad: boolean = false;

  constructor(private indexService: IndexService) {
  }

  ngOnInit() {
    document.body.style.background = '#231D4D';
    this.earlyMarket(1);
    this.eveningMarket(2);
  }

  ngOnDestroy() {
    console.log(this.earlyInterval);
    clearInterval(this.earlyInterval);
    clearInterval(this.eveningInterval);
  }

  /**
   * 判断早市是否开始
   */
  earlyMarket(marketType: number): void {
    this.isHaveLoad = true;
    this.indexService.earlyAndEveningMarket(marketType)
      .then(res => {
        let leftTime = res.result.leftTime;
        this.isHaveLoad = false;

        if (leftTime === 0) {
          this.earlyStart = true;
        } else {
          this.earlyStart = false;
          this.earlyMarketTime = this.formatDuring(leftTime);
          clearInterval(this.earlyInterval);
          this.earlyInterval = setInterval(() => {
            this.earlyMarketTime = this.formatDuring(leftTime);
            leftTime = leftTime - 1000;
          }, 1000);
        }
      })
      .catch(res => {
        this.isHaveLoad = false;
        console.log(res);
      });
  }

  /**
   * 判断晚市是否开始
   */
  eveningMarket(marketType: number): void {
    this.isHaveLoad = true;
    this.indexService.earlyAndEveningMarket(marketType)
      .then(res => {
        let leftTime = res.result.leftTime;
        this.isHaveLoad = false;

        if (leftTime === 0) {
          this.eveningStart = true;
        } else {
          this.eveningStart = false;
          this.eveningMarketTime = this.formatDuring(leftTime);
          clearInterval(this.eveningInterval);
          this.eveningInterval = setInterval(() => {
            this.eveningMarketTime = this.formatDuring(leftTime);
            leftTime = leftTime - 1000;
          }, 1000);
        }
      })
      .catch(res => {
        this.isHaveLoad = false;
        console.log(res);
      });
  }

  formatDuring(mss: number): any {
    // const day = Math.floor(mss / 1000 / 60 / 60 / 24);
    // const hours = Math.floor(mss / 1000 / 60 / 60 % 24);
    const allHours = Math.floor(mss / 1000 / 60 / 60);
    const minutes = Math.floor(mss / 1000 / 60 % 60);
    const seconds = Math.floor(mss / 1000 % 60);
    return `${allHours < 10 ? '0' + allHours : allHours  } : ${ minutes < 10 ? '0' + minutes : minutes } : ${seconds < 10 ? '0' + seconds : seconds} `;
  }

  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
