import { Component, inject, OnInit } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormField, MatHint, MatInputModule, MatLabel } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryServices } from '../../../shared/services/category.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-category',
  // Se han eliminado MatFormField, MatLabel, MatHint de los imports porque no son standalone.
  // MatInputModule ya es standalone y se importa correctamente.
  imports: [MatDialogContent, MatDialogActions, MatIcon, ReactiveFormsModule, MatInputModule, MatButtonModule], 
  templateUrl: './new-category.html',
  styleUrl: './new-category.css'
})
export class NewCategory implements OnInit{

  public categoryForm!: FormGroup;
  estadoFormulario: string = "Agregar";
  private fb = inject(FormBuilder);
  private categoryServices = inject(CategoryServices);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA)
    
    ngOnInit(): void {
      this.categoryForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
      if(this.data!= null){
        this.updateForm(this.data);
        this.estadoFormulario = "Actualizar";
      }
      console.log(this.data);
    }

    onSave(){
      // 🛑 CORRECCIÓN CLAVE: Obtener el valor de 'description' correctamente.
      // Opción 1: Obtener todos los valores con .value (Recomendado)
      const data = this.categoryForm.value;

      /* Opción 2: Si quieres construir el objeto manualmente, usa .get() en el FORMGROUP:
      let data = {
        name: this.categoryForm.get('name')?.value,
        description: this.categoryForm.get('description')?.value
      }
      */

      // La siguiente línea causa el error porque intenta usar .get() en un objeto de valores plano:
      // description: this.categoryForm.value.get('description')?.value 

      // Se usa la variable 'data' que ahora contiene { name: '...', description: '...' }
      if(this.data != null){
        // Actualizar categoría existente
        this.categoryServices.updateCategory(data, this.data.id)
              .subscribe((data:any)=>{
                this.dialogRef.close(1);
              },(error:any) =>{ 
                this.dialogRef.close(2);
              })
                
      }else{
        // Crear nueva categoría
        this.categoryServices.saveCategory(data)
       .subscribe((response:any)=>{ // Usar 'response' en lugar de 'data' es mejor práctica
         console.log(response);
         this.dialogRef.close(1);
       },(error:any)=>{
         this.dialogRef.close(2);
       }) ;
      }
      
    }

    onCancel(){
        this.dialogRef.close(3); // Cerrar sin acción (o con un código 0)
    }
    updateForm(data:any){
        this.categoryForm = this.fb.group({
        name: [data.name, Validators.required],
        description: [data.description, Validators.required]
      });
    }
}