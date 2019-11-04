import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safeHtml.pipe';

@NgModule({
  imports: [],
  declarations: [
    SafeHtmlPipe
  ],
  exports: [
    SafeHtmlPipe
  ]
})
export class PipesModule { }
