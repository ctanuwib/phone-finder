export class BrandFilter {
  brand: string;
  checked: boolean;

  constructor(brand = '', checked = false) {
    this.brand = brand;
    this.checked = checked;
  }
}
