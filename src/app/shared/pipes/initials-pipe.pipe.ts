import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialsPipe'
})
export class InitialsPipePipe implements PipeTransform {
  initials: string;
  transform(username: string): any {
    if (username.indexOf(" ") >= 0) {
      this.initials = username
        .split(' ')
        .map((n) => n[0])
        .join('');
      return this.initials;
    } else {
      this.initials = username.substring(0, 2);
      return this.initials;
    }
  }

}
