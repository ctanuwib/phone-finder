import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Component } from '@angular/core';
import { BrandFilter } from './classes/brand-filter';
import { PhoneInfo } from './classes/phone-info';
import { YearFilter } from './classes/year-filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phone-finder';

  searchInput: string = "";

  years: YearFilter[] = [];
  brands: BrandFilter[] = [];

  phones: PhoneInfo[] = [];
  originalPhones: PhoneInfo[] = [];

  constructor(private _http : HttpClient){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._http.get<{phones: PhoneInfo[]}>("assets/phonedata.json").subscribe( (data) => {
      this.phones = data.phones;
      this.originalPhones = this.phones;
      this.getYearList(this.phones);
      this.getBrandList(this.phones);
      console.log(this.phones);
    })
  }

  getYearList(phones: PhoneInfo[]): void {
    for (const item of phones){
      if (!this.years.find((x)=> x.year == item.release_year)){
        this.years.push(new YearFilter(item.release_year));
      }
    }
    this.years.sort( (a,b) => a.year - b.year);
  }

  getBrandList(phones: PhoneInfo[]): void {
    for (const item of phones){
      if (!this.brands.find((x)=> x.brand == item.brand)){
        this.brands.push(new BrandFilter(item.brand));
      }
    }
    this.brands.sort( (a,b) => a.brand < b.brand? -1 : 1);
  }

  filterPhones(): void {
    let filteredList = this.originalPhones;
    if (this.yearChecked()) {
      for (const year of this.years.filter((x) => x.checked == true)){
        filteredList = filteredList.filter((phone) => phone.release_year == year.year);
      }
    }
    if (this.brandChecked()){
      for (const brand of this.brands.filter((x) => x.checked == true)){
        filteredList = filteredList.filter((phone) => phone.brand == brand.brand);
      }
    }
    this.phones = filteredList;
  }

  yearChecked(): boolean {
    const checked = this.years.find((x) => x.checked == true);
    return checked != null;
  }

  brandChecked(): boolean {
    const checked = this.brands.find((x) => x.checked == true);
    return checked != null;
  }
}
