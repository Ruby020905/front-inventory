import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { CategoryServices } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { MaterialModule } from "../../shared/material-module";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; // Importar Observable
import { map } from 'rxjs/operators'; // Importar map
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-new-product',
  standalone: true, // Asegúrate de tener esto
  imports: [
    MatDialogContent, 
    ReactiveFormsModule, 
    MaterialModule,
    CommonModule,
    MatNativeDateModule,
  ],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css',
  providers: [provideNativeDateAdapter()],
})
export class NewProduct implements OnInit {
  public productForm!: FormGroup;
  estadoFormulario: string = "Agregar";
  
  // 1. Cambiamos el tipo a Observable
  categories$!: Observable<any[]>; 
  selectedFile: any;
  nameImg: string = "";

  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<NewProduct>);
  private categoryServices = inject(CategoryServices);
  public data = inject(MAT_DIALOG_DATA);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
      type: ['', Validators.required],
      account: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern("^[0-9]*$")]], // Validación numérica
      picture: ['', Validators.required],
    });

     if(this.data!= null){
        this.updateForm(this.data);
        this.estadoFormulario = "Actualizar";
      }
      console.log(this.data);

    // 2. Asignamos el flujo de datos
    this.categories$ = this.categoryServices.getCategories().pipe(
      map((data: any) => data.categoryResponse.category)
    );
  }

  onSave() {
  const dateObj = this.productForm.get('date')?.value;
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
    let data ={
      name: this.productForm.get('name')?.value,
      category: this.productForm.get('category')?.value,
      date: formattedDate,
      type: this.productForm.get('type')?.value,
      account: this.productForm.get('account')?.value,
      stock: this.productForm.get('stock')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('CategoryId', data.category);
    uploadImageData.append('date', formattedDate);
    uploadImageData.append('type', data.type);
    uploadImageData.append('account', data.account);
    uploadImageData.append('stock', data.stock);

    if(this.data != null){
      // Llamar al servicio para actualizar el producto
      this.productService.updateProduct(this.data.id, uploadImageData).subscribe({
        next: (response) => {
          console.log('Producto actualizado exitosamente', response);   
          this.dialogRef.close(1); // Criterio #4: Cerrar para actualizar lista
        },
        error: (error) => {
          console.error('Error al actualizar el producto', error);
          this.dialogRef.close(2); // Criterio #4: Cerrar para actualizar lista

        }
      });   

    }

    // Llamar al servicio para guardar el producto
this.productService.saveProduct(uploadImageData).subscribe({
      next: (response) => {
        console.log('Producto creado exitosamente', response);
        this.dialogRef.close(true); // Criterio #4: Cerrar para actualizar lista
      },
      error: (error) => {
        console.error('Error al crear el producto', error);
      }
    });

  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.nameImg = event.target.files[0].name;
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      category: [data.category.id, Validators.required],
      date: [data.date, Validators.required],
      type: [data.type, Validators.required],
      account: [data.account, Validators.required],
      stock: [data.stock, [Validators.required, Validators.pattern("^[0-9]*$")]], // Validación numérica
      picture: ['', Validators.required],
    });
  }
}