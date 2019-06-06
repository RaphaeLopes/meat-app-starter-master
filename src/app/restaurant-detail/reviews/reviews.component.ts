import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.parent.snapshot.params['id'];
    this.reviews = this.restaurantsService.reviewsOfRestaurante(id)
  }
}
