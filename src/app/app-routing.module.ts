import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

/**
 * 主路由
 */
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'seckill'},
  {path: 'seckill', loadChildren: 'app/seckill-activity/seckill-activity.module#SeckillActivityModule'},
  {path: '**', redirectTo: 'seckill'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
