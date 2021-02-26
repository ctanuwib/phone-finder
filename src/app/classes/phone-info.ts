export class PhoneInfo {
  name: string;
  checked: boolean;
  description: string;
  release_year: number;
  brand: string;

  constructor(){
    this.name = "";
    this.checked = false;
    this.description = "";
    this.release_year = 0;
    this.brand = "";
  }
}
