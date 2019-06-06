import { Component } from '@angular/core';
import { CartServiceService } from './cart-service.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cartitems: any;
  shouldBeHidden: boolean = true;

  constructor(private service: CartServiceService) {
    this.service.getAllItems().subscribe(response => {
      this.cartitems = response;
    });
  }

  toggleForm(index) {
    this.cartitems[index].beingUpdated = !this.cartitems[index].beingUpdated;
    console.log(this.cartitems);
    this.shouldBeHidden = !this.shouldBeHidden;
  }

  addItem(form) {
    console.log(form);
    this.service.addItem({
      ...form.value
    }).subscribe(response => {
      this.cartitems = response;
    });
  }

  deleteItem(id) {
    this.service.deleteItem(id).subscribe(response => {
      this.cartitems = response;
    });
  }

  updateItem(id) {
    this.service.updateItem(id).subscribe(response => {
      this.cartitems = response;
    });
  }                
}
