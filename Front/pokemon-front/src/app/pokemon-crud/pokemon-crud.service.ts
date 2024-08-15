import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './interfaz/pokemon.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonCrudService {
  private apiUrl = 'http://localhost:3000/pokemons'; // Cambia a tu URL de la API

  constructor(private http: HttpClient) { }

   // Método para obtener todos los pokemons
   getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.apiUrl, pokemon);
  }

  // Actualizar un pokemon existente
  updatePokemon(id: number, pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Pokemon>(url, pokemon);
  }

  // Eliminar un pokemon
  deletePokemon(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
