import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoryServices } from '../../../shared/services/category.service';
import { MatCard, MatCardHeader } from "@angular/material/card";
import { MaterialModule } from "../../../shared/material-module";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategory } from '../new-category/new-category';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Confirm } from '../../../shared/components/confirm/confirm';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatCard, MatCardHeader, MaterialModule, MatTableModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category implements OnInit {
   private categoryServices = inject(CategoryServices);
   private snackbar = inject(MatSnackBar);
   public dialog =inject(MatDialog);


  ngOnInit(): void {
    this.getCategories();
    
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

@ViewChild(MatPaginator)
paginator!: MatPaginator;

  getCategories(): void {
    this.categoryServices.getCategories()
      .subscribe((data:any)=>{
        console.log("respuesta categories",data);
        this.processCategoriesResponse(data);
      },(error:any)=>{
        console.log("error",error);
      });
    }

    processCategoriesResponse(resp:any) {

      const dataCategory: CategoryElement[] = [];

      if (resp.metadata[0].code == "00") {
        let listCategory = resp.categoryResponse.category
        listCategory.forEach((element: CategoryElement )=> {
          dataCategory.push(element)
        });

        this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
        this.dataSource.paginator = this.paginator;
      }
}

    openCategoryDialog(): void {
      const dialogRef = this.dialog.open(NewCategory, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar('Categoría Agregada', 'Exitosa');
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar('Se produce un error al agregar categoría', 'Error');
      }
   
    });
    }

    edit(id: number, name: string, description: string) {
        const dialogRef = this.dialog.open(NewCategory, {
          width: '450px',
      data: {id:id, name: name, description: description},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar('Categoría Actualizada', 'Exitosa');
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar('Se produce un error al actualizar categoría', 'Error');
      }
   
    });
  }

    delete(id: number) {
       const dialogRef = this.dialog.open(Confirm, {
      data: {id:id, },
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar('Categoría Eliminada', 'Exitosa');
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar('Se produce un error al eliminar categoría', 'Error');
      }
   
    });
    }

    buscar(termino: string) {
      if(termino.length===0){
        return this.getCategories();
      }
      this.categoryServices.getCategoryById(termino)
      .subscribe((resp:any) =>{
        this.processCategoriesResponse(resp);
      });
    }

    openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
      return this.snackbar.open(message, action, {
        duration: 2000,
      });
    }
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}

