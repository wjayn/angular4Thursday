import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CarItemsList} from '../../../entity/index';

@Component({
  selector: 'app-service-business',
  templateUrl: './service-business.component.html',
  styleUrls: ['./service-business.component.scss']
})
export class ServiceBusinessComponent implements OnInit {

  @Input() childShade: boolean;
  @Output() voted = new EventEmitter<number>();
  @Output() shade = new EventEmitter<boolean>();
  goods: CarItemsList;

  constructor() {
  }

  ngOnInit() {
    this.goods = JSON.parse(localStorage.getItem('automobileServiceGoods'));
  }

  /**
   * 关闭遮罩
   */
  close(): void {
    this.childShade = false;
    this.shade.emit(false);
  }

  /**
   * 选中事件
   * @param index
   */
  check(index: number): void {
    this.voted.emit(index);
  }
}
