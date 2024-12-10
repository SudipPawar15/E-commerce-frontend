import { Product } from "../components/home/home.component";

export class Orders {
    user: { id: number }; 
    totalAmount: number;  
    status: string = 'Pending';  
    products: { id: number }[];  

    constructor(user: number, totalAmount: number, products: any[]) {
        this.user = { id: user };  
        this.totalAmount = totalAmount;
        this.products = products.map(product => ({ id: product.id })); 
    }
  }
