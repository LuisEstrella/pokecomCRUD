import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './interfaz/pokemon.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonCrudService {
  private apiUrl = 'http://localhost:3000/pokemons'; // Cambia a tu URL de la API

  constructor(private http: HttpClient) { }

   // Método para obtener todos los productos
   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Actualizar un producto existente
  updateProduct(id: number, product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Product>(url, product);
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
