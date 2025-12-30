import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base_url = 'http://localhost:8080/api/v1';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http: HttpClient) { }

  /**
   * get all the products
   */
  getProducts() {
   const endpoint = `${base_url}/products`;
    return this.http.get(endpoint);
  }
   
  /**
   * save a product
   */

  saveProduct(product: any) {
    const endpoint = `${base_url}/products`;
    return this.http.post(endpoint, product);
  }

  /**
   * update a product
   */
  updateProduct(id: number, product: any) {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.put(endpoint, product);
  } 

  /***
   * delete a product
   * 
   */
  deleteProduct(id: any) {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * search product by name
   */
  getProductByName(name: any) {
    const endpoint = `${base_url}/products/filter/${name}`;
    return this.http.get(endpoint);
  }
   
}
