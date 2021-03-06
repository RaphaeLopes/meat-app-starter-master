import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms'
import { RadioOption } from "../shared/radio/radio-option.model";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { OrderService } from "../order/order.service";
import { Order, OrderItem } from "./order.model";

import {Router} from '@angular/router'

import {tap} from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  orderForm: FormGroup

  delivery: number = 8

  orderId: String

  paymentOptions: RadioOption[] = [
    {label:'Dinheiro', value:'MON'},
    {label:'Cartão de Débito', value:'DEB'},
    {label:'Cartão Refeição', value:'REF'}
  ]

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
        name: new FormControl('', {validators : [Validators.required, Validators.minLength(5)]}),
        email: new FormControl('', {validators: [ Validators.required, Validators.pattern(this.emailPattern)]}),
        emailConfirmation: new FormControl('', {validators: [ Validators.required, Validators.pattern(this.emailPattern)]}),
        address: new FormControl('', {validators: [ Validators.required, Validators.minLength(5)]}),
        number: new FormControl('', {validators: [ Validators.required, Validators.pattern(this.numberPattern)]}),
        optionalAddress: new FormControl(''),
        paymentOption: new FormControl('', {validators: [ Validators.required]})
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'})
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean}
  {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if(!email || !emailConfirmation){
      return undefined;
    }

    if(email.value !== emailConfirmation.value){
      return {emailNotMatch:true};
    }

    return undefined;
  }

  itemsValue() {
    return this.orderService.itemsValue()
  }

  cartItems(){
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems()
      .map((item:CartItem)=> new OrderItem(item.quantity, item.menuItem.id))
      this.orderService.checkOrder(order)
        .pipe(tap((orderId: string) =>{
          this.orderId = orderId
        }))
        .subscribe((orderId: string) => {
          this.orderService.clear()
          this.router.navigate(['/order-summary'])
        })
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }
}
