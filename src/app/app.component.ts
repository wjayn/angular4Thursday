import {Component, OnInit} from '@angular/core';
import {IndexService} from './service/index.service';
import {environment} from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private indexService: IndexService) {
  }

  ngOnInit() {
    this.getToken();
  }


  getToken(): void {
    if (!localStorage.getItem('headimgurl')) {
      localStorage.setItem('headimgurl', '用户无头像');
    }
    if (!localStorage.getItem('nickname')) {
      localStorage.setItem('nickname', '用户无名氏');
    }
    if (!localStorage.getItem('openid')) {
      // location.href = 'https://mobile.sxwinstar.net/ccb/ccb-php/index.php?type=callback&menu=thursday';
      // location.href = '/php-api/wechat_front/ccb/ccb-php/index.php?type=callback&menu=thursday';
      location.href = environment.thursdayPhpUrl;
      return;
    } else {
      this.indexService.getTokenId(localStorage.getItem('headimgurl'),
        localStorage.getItem('nickname'),
        localStorage.getItem('openid'))
        .then(res => {
          localStorage.setItem('ccbToken', res.tokenId);
        })
        .catch(res => {

        });
    }
  }
}
