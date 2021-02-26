import { Pipe, PipeTransform } from '@angular/core';
import { PhoneInfo } from '../classes/phone-info';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: PhoneInfo[], searchText?: string): any {
    if (!searchText) {
      return value;
    }

    return value.filter((data) => data.name.toLowerCase().includes(searchText.toLowerCase()));
  }
}
