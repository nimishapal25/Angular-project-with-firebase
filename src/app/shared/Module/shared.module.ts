import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitialsPipePipe } from '../pipes/initials-pipe.pipe';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { HighlightDirective } from '../directives/highlight.directive';



@NgModule({
  declarations: [
    InitialsPipePipe,
    FileSizePipe,
    HighlightDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InitialsPipePipe,
    FileSizePipe,
    HighlightDirective
  ]
})
export class SharedModule { }
