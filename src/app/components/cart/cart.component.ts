import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/components/home/home.component';
import { OrderService } from 'src/app/services/order.service';
import { Orders } from 'src/app/common/orders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Product[] = [];  
  user: number = +localStorage.getItem('uId')!;  
  totalAmount: number = 0;  
  successMessage: string = '';  
  loading: boolean = false;  

  constructor(private orderService: OrderService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    
    this.cart = this.cartService.getCart(); 
    this.calculateTotalAmount();
  }


  calculateTotalAmount(): void {
    this.totalAmount = this.cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }

  
  updateTotalAmount(product: Product): void {
    this.calculateTotalAmount(); 
  }

  
  placeOrder(): void {
    
    const order = new Orders(this.user, this.totalAmount, this.cart);
    this.loading = true;  
    this.successMessage = '';  

    this.orderService.placeOrder(order).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        this.successMessage = 'Your order has been placed successfully!';
        this.loading = false;  
        this.cartService.clearCart();  
        

      },
      (error) => {
        console.error('Error placing order', error);
        this.successMessage = 'There was an error placing your order. Please try again.';
        this.loading = false;  
      }
    );
  }

  
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart(); 
    this.calculateTotalAmount(); 
  }
}
