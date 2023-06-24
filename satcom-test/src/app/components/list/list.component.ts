import { ComponentService } from './../../services/component.service';
import { MockDataService } from './../../services/mock-data.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  filterForm: FormControl;
  subscriptions = new Subscription();
  itemsList: (Customer | Product )[] = [];
  listData: (Customer | Product )[] = []
  searchedInput: RegExp

  constructor(
    private MockDataService: MockDataService,
    private ComponentService: ComponentService  
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.MockDataService.getData().subscribe((data) => {
      this.listData = data
      this.itemsList = this.listData
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showElement(element:  Product | Customer) {
    this.ComponentService.setComponent(element)
  }

  initForm(): void {
    this.filterForm = new FormControl();
    this.subscriptions.add(
      this.filterForm.valueChanges.subscribe((filterValue) => {
        this.onFilterChange(filterValue);
      })
    )
  }

  onFilterChange(inputSearched: string) {
    if (inputSearched) {
      this.searchedInput = new RegExp(inputSearched, "i")
      
      this.itemsList = this.listData.filter((item) => {
        return this.checkSearchMatch(item, this.searchedInput)
      })
    } else {
      this.itemsList = this.listData
    }
  }

  checkSearchMatch(item: Customer | Product, input: RegExp): RegExpMatchArray | null {
    if ('premium' in item && item.premium) {
      return null
    } else if ('price' in item) {
      return item.name.match(input) || item.price.toFixed(2).match(input)
    } else {
      return item.name.match(input)
    }
  }
}