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
  if (this.productForm.invalid) return;

  // 1. Lógica de la fecha (asegurando objeto Date)
  const dateValue = this.productForm.get('date')?.value;
  const dateObj = new Date(dateValue);
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // 2. Preparar el FormData
  const uploadImageData = new FormData();
  uploadImageData.append('name', this.productForm.get('name')?.value);
  uploadImageData.append('CategoryId', this.productForm.get('category')?.value);
  uploadImageData.append('date', formattedDate);
  uploadImageData.append('type', this.productForm.get('type')?.value);
  uploadImageData.append('account', this.productForm.get('account')?.value);
  uploadImageData.append('stock', this.productForm.get('stock')?.value);

  // Solo adjuntar imagen si se seleccionó una nueva
  if (this.selectedFile) {
    uploadImageData.append('picture', this.selectedFile, this.selectedFile.name);
  }

  // --- 3. SEPARACIÓN LÓGICA (Aquí evitas el duplicado) ---
  if (this.data != null) {
    // CASO ACTUALIZAR
    this.productService.updateProduct(this.data.id, uploadImageData).subscribe({
      next: (response) => {
        console.log('Producto actualizado exitosamente', response);
        this.dialogRef.close(true);
      },
      error: (error) => console.error('Error al actualizar', error)
    });

  } else {
    // CASO GUARDAR NUEVO
    this.productService.saveProduct(uploadImageData).subscribe({
      next: (response) => {
        console.log('Producto creado exitosamente', response);
        this.dialogRef.close(true);
      },
      error: (error) => console.error('Error al crear', error)
    });
  }
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