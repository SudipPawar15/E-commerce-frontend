import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  quantity: number;  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

logout() {
   localStorage.removeItem('jwtToken')
   
   this.router.navigateByUrl("/login")
   
}
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  outOfStockMessage: string = ''; 

  
  filterOption: string = 'all';  
  
  
  thePageNumber: number = 1;
  thePageSize: number = 5;
  totalElements: number = 0;

  constructor(
    private productsService: ProductsService,
    private userService: UserService,
    private cartService: CartService, 
    private router: Router) {}

  uId!: number;

  ngOnInit(): void {
    this.loadProducts();
    this.getId();
  }

  getId() {
    this.userService.getId().subscribe(data => {
      this.uId = data;
      console.log(this.uId);
      localStorage.setItem('uId', String(this.uId));  
    });
  }

  loadProducts(): void {
    this.productsService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize).subscribe(
      (data) => {
        this.products = data.products;
        this.totalElements = data.elements;
        this.filteredProducts = this.filterProducts();
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  filterProducts(): Product[] {
    let filtered = this.products;
  
    
    if (this.searchQuery) {
      const searchTerms = this.searchQuery.toLowerCase().split(' ').filter(term => term.trim() !== '');
      filtered = filtered.filter((product) => {
        const nameMatch = searchTerms.every(term => product.name.toLowerCase().includes(term));
        const descriptionMatch = searchTerms.every(term => product.description.toLowerCase().includes(term));
        return nameMatch || descriptionMatch;
      });
    }
  
    
    if (this.filterOption === 'low-to-high') {
      filtered = filtered.sort((a, b) => a.price - b.price);  
    } else if (this.filterOption === 'high-to-low') {
      filtered = filtered.sort((a, b) => b.price - a.price);  
    } else if (this.filterOption === 'in-stock') {
      filtered = filtered.filter((product) => product.stockQuantity > 0);  
    }
  
    return filtered;
  }
  
  
  addToCart(product: Product): void {
    if (product.stockQuantity <= 0) {
      this.outOfStockMessage = `Sorry, ${product.name} is out of stock.`;  
    } else {
      this.cartService.addToCart(product);  
      this.outOfStockMessage = ''; 
    }
  }

  
  onFilterChange(event: any): void {
    this.filterOption = event.target.value;
    this.filteredProducts = this.filterProducts();
  }

  goToPage(page: number): void {
    if (page < 1 || page > Math.ceil(this.totalElements / this.thePageSize)) return;
    this.thePageNumber = page;
    this.loadProducts();
  }
}
