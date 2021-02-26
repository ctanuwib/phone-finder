export class YearFilter {
  year: number;
  checked: boolean;

  constructor(year = 0, checked = false) {
    this.year = year;
    this.checked = checked;
  }
}
