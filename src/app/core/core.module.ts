import { NgModule} from '@angular/core';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { OrderService } from "../order/order.service";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";

@NgModule({
  providers:[RestaurantsService, ShoppingCartService, OrderService]
})

export class CoreModule{}
