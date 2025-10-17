import { Component, inject, OnInit } from '@angular/core';
import { CategoryServices } from '../../../shared/services/category.service';
import { MatCard, MatCardHeader } from "@angular/material/card";
import { MaterialModule } from "../../../shared/material-module";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatCard, MatCardHeader, MaterialModule, MatTableModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category implements OnInit {
   private categoryServices = inject(CategoryServices);


  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();
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
    }
}
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}

