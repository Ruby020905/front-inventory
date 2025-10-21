import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { CategoryServices } from '../../services/category.service';
import { MatButton } from '@angular/material/button';

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

    ngOnInit(): void {
      
    }
    onNoClick(){
        this.dialogRef.close(3); // Cerrar sin acción (o con un código 3)
    }
    delete(){
      if(this.data != null){
        // Eliminar categoría existente
        this.categotryServices.deleteCategory( this.data.id)
              .subscribe((data:any)=>{
                this.dialogRef.close(1);
              },(error:any) =>{ 
                this.dialogRef.close(2);
              });
      }else{
        this.dialogRef.close(2); // Cerrar sin acción (o con un código 2)
      }
      
    } 
}
