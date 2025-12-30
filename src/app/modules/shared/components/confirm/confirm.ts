import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { CategoryServices } from '../../services/category.service';
import { MatButton } from '@angular/material/button';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  imports: [MatDialogActions,MatDialogContent,MatButton, MatDialogTitle],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css'
})
export class Confirm implements OnInit{

  private categotryServices = inject(CategoryServices);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA)
  private productService = inject(ProductService);

    ngOnInit(): void {
      
    }
    onNoClick(){
        this.dialogRef.close(3); // Cerrar sin acción (o con un código 3)
    }
   
    delete() {
  if (this.data != null && this.data.id != null) {
    
    if (this.data.module === "category") {
      // Eliminar categoría
      this.categotryServices.deleteCategory(this.data.id).subscribe({
        next: (data: any) => this.dialogRef.close(1),
        error: (error: any) => this.dialogRef.close(2)
      });

    } else if (this.data.module === "product") {
      // Eliminar producto
      this.productService.deleteProduct(this.data.id).subscribe({
        next: (data: any) => this.dialogRef.close(1),
        error: (error: any) => this.dialogRef.close(2)
      });
    }

  } else {
    this.dialogRef.close(2);
  }
}
}
