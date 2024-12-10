import { Injectable } from '@angular/core';
import { Product } from 'src/app/components/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';  

  constructor() {}

 
  getCart(): Product[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

 
  addToCart(product: Product): void {
    const cart = this.getCart();
    cart.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

 
  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter((product: Product) => product.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }


  clearCart(): void {
    localStorage.removeItem(this.cartKey);  
  }
}
