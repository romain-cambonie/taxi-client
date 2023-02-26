import { Pipe, PipeTransform } from '@angular/core';
import { isPhone } from '../validators/username/is-phone';

@Pipe({ name: 'isPhone' })
export class IsPhonePipe implements PipeTransform {
  public transform(username: string | null): boolean {
    return username != null && isPhone(username);
  }
}
