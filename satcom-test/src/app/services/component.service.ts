import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from '../models/customer';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private component = new Subject<Customer | Product>();
  currentComponent = this.component.asObservable();
  
  constructor() { }

  setComponent(element: Customer | Product) {
    this.component.next(element)
  }
}
