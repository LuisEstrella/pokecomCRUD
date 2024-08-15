import { Component, OnInit } from '@angular/core';
import { Pokemon } from './interfaz/pokemon.interface';
import { PokemonCrudService } from './pokemon-crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-pokemon-crud',
  templateUrl: './pokemon-crud.component.html',
  styleUrls: ['./pokemon-crud.component.css']
})
export class PokemonCrudComponent implements OnInit {
  
  pokemonData: Pokemon[] = [];
  pokemonForm: FormGroup;
  idTemp: number = 0;

  constructor(private pokemonCrudService : PokemonCrudService, private fb: FormBuilder) { 
    this.pokemonForm = this.fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
      Level: ['', Validators.required],
      Image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.pokemonCrudService.getPokemons().subscribe((data: Pokemon[]) => {
      this.pokemonData = data;
    });
  }

  onSubmit(): void {
    if (this.pokemonForm.valid) {
      const newPokemon: Pokemon = this.pokemonForm.value;
      if(this.idTemp != 0){
        this.pokemonCrudService.updatePokemon(this.idTemp,newPokemon).subscribe(() => {
          this.loadProducts();
          this.idTemp = 0;
          this.pokemonForm.reset();
          this.resetFileInput();
        });
      }else{

        this.pokemonCrudService.createPokemon(newPokemon).subscribe(() => {
          this.loadProducts();
          this.pokemonForm.reset();
          this.resetFileInput();
        });
      }
    }
  }

  editProduct(product: Pokemon): void {
    // Lógica para editar el pokemon
    this.idTemp = product.id;
    this.pokemonForm.patchValue(product);
    
  }

  deleteProduct(productId: number): void {
    this.pokemonCrudService.deletePokemon(productId).subscribe(() => {
      this.loadProducts();
    });
  }

  onCancel(){
    this.pokemonForm.reset();
    this.resetFileInput();
    this.idTemp = 0;
  }

  // Función para manejar la conversión de imagen a base64
  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.pokemonForm.patchValue({ Image: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  resetFileInput(): void {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
}
