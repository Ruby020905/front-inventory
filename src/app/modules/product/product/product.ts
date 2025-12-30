import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatCardModule } from "@angular/material/card";
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NewProduct } from '../new-product/new-product';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  imports: [MatCardModule, MatFormField, MatLabel, MatPaginator, MatTableModule, MatInputModule, MatIcon,MatFormFieldModule,MatButtonModule,
    MatIconModule,],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {

    private productService = inject(ProductService);
    private snackbar = inject(MatSnackBar);
    public dialog = inject(MatDialog);


ngOnInit(): void {
    this.getProducts();
}
    displayedColumns: string[] = ['name', 'category', 'type', 'account', 'stock', 'picture', 'date', 'actions'];
    dataSource = new MatTableDataSource<ProductElement>;

    @ViewChild(MatPaginator) 
    paginator!: MatPaginator;

    getProducts(): void { 
      this.productService.getProducts()
      .subscribe((data:any)=>{
        console.log("respuesta de productos:",data);
        this.processProductsResponse(data);
      },(error:any)=>{
        console.log("error",error);
      });
     }

     processProductsResponse(resp:any) {

      const dataProduct: ProductElement[] = [];   
      if (resp.metadata[0].code == "00") {
        let listProduct = resp.product.products
        listProduct.forEach((element: ProductElement )=> {
          element.category = element.category.name;
          element.picture = 'data:image/jpeg;base64,' + element.picture;
          dataProduct.push(element);
        });
        //set dataSource
        this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
        this.dataSource.paginator = this.paginator;
       }  
       
}

openProductDialag():  void {
      const dialogRef = this.dialog.open(NewProduct, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar('Producto Agregado', 'Exitosa');
        this.getProducts();
      }else if (result == 2){
        this.openSnackBar('Se produce un error al agregar producto', 'Error');
      }
    });
    }

    openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
      return this.snackbar.open(message, action, {
        duration: 2000,
      });
    }


}
export interface ProductElement {
    id: number;
    name: string;
    category: any;
    type: string;
    account: string;
    stock: number;
    picture: any;
    date: Date;
    
}