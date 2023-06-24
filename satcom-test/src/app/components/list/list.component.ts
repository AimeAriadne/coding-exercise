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
  itemsList: (Customer | Product )[] = []

  constructor(private MockDataService: MockDataService) {

  }

  ngOnInit(): void {
    this.initForm()
    this.MockDataService.getData().subscribe((data) => {
      this.itemsList = data
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

  }
}
