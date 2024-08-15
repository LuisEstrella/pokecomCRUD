import { Component, OnInit } from '@angular/core';
import { Product } from './interfaz/pokemon.interface';
import { PokemonCrudService } from './pokemon-crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-pokemon-crud',
  templateUrl: './pokemon-crud.component.html',
  styleUrls: ['./pokemon-crud.component.css']
})
export class PokemonCrudComponent implements OnInit {


  // products: Product[] = [
  //   { id: 1, Name: 'Producto 1', Type: "test", Level: 100 },
  //   { id: 2, Name: 'Producto 2', Type: "test", Level: 200 },
  //   { id: 3, Name: 'Producto 3', Type: "test", Level: 300 }
  // ];
  
  products: Product[] = [];
  productForm: FormGroup;
  idTemp: number = 0;

  constructor(private pokemonCrudService : PokemonCrudService, private fb: FormBuilder) { 
    this.productForm = this.fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
      Level: ['', Validators.required],
      Image: ['', Validators.required],
      id: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.pokemonCrudService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      if(this.idTemp != 0){
        this.pokemonCrudService.updateProduct(this.idTemp,newProduct).subscribe(() => {
          this.loadProducts();
          this.idTemp = 0;
          this.productForm.reset();
        });
      }else{

        this.pokemonCrudService.createProduct(newProduct).subscribe(() => {
          this.loadProducts();
          this.productForm.reset();
        });
      }
    }
  }

  editProduct(product: Product): void {
    // Lógica para editar el producto
    this.idTemp = product.id;
    this.productForm.patchValue(product);
    
  }

  deleteProduct(productId: number): void {
    this.pokemonCrudService.deleteProduct(productId).subscribe(() => {
      // this.products = this.products.filter(p => p.id !== productId);
      this.loadProducts();
    });
  }

}
