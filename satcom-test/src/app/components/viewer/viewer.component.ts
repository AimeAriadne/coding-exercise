import { ComponentService } from './../../services/component.service';
import {Component, ComponentRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import {Subscription} from "rxjs";
import {CustomerComponent} from "../customer/customer.component";
import {PremiumProductComponent} from "../premium-product/premium-product.component";
import {ProductComponent} from "../product/product.component";
import {DynamicComponentsMapperUtils} from "../../utils/dynamic-components-mapper.utils";
import {Customer} from "../../models/customer";
import {Product} from "../../models/product";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  currentComponent: ComponentRef<CustomerComponent | PremiumProductComponent | ProductComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private ComponentService: ComponentService  
  ) { }

  ngOnInit(): void {
    this.ComponentService.currentComponent.subscribe((element) => {
      this.addDetailsComponentToView(element)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addDetailsComponentToView(element: Customer | Product): void {
    if (this.currentComponent != null) {
      this.currentComponent.destroy();
    }
    const component = DynamicComponentsMapperUtils.getComponent(element);
    this.currentComponent = this.viewContainerRef.createComponent(component);
    this.currentComponent.instance.element = element;
    this.viewContainerRef.insert(this.currentComponent.hostView);
  }
}
