import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoryServices {

  constructor (private http: HttpClient){}

  /** Obtener todas las categorías */
    getCategories(){

      const endpoint =  `${base_url}/categories`;
      return this.http.get(endpoint);
    }

    /** Guardar categorias*/
    saveCategory(body: any){
      const endpoint =  `${base_url}/categories`;
      return this.http.post(endpoint, body);
  } 
/** Actualizar categoria */
    updateCategory( body: any, id: string){
      const endpoint =  `${base_url}/categories/${id}`;
      return this.http.put(endpoint, body);
    }

  /* Eliminar categoria */
    deleteCategory(id: any){
      const endpoint =  `${base_url}/categories/${id}`;
      return this.http.delete(endpoint);
    }

    /** Buscar categoria por ID */
    getCategoryById(id: any){
      const endpoint =  `${base_url}/categories/${id}`;
      return this.http.get(endpoint);
    }
}
