import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../../animationsVariable';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-receive-success',
  templateUrl: './receive-success.component.html',
  styleUrls: ['./receive-success.component.scss'],
  animations: [flyIn]
})
export class ReceiveSuccessComponent implements OnInit {
  type: string;

  constructor(private title: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.title.setTitle('赠品领取成功');
    this.activatedRoute.params.subscribe(res => {
      console.log(res);
      this.type = res.type;
    });

  }
  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
