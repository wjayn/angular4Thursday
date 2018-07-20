import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@toverux/ngsweetalert2';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class ShareModule {
}
