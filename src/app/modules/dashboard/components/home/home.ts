import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { ProductElement } from '../../../product/product/product';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // ✅ OBLIGATORIO

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  chartBar: any;
  chartDoughnut: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.processProductsResponse(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  processProductsResponse(resp: any) {

    const nameProduct: string[] = [];
    const stock: number[] = [];

    if (resp.metadata[0].code === "00") {

      resp.product.products.forEach((element: ProductElement) => {
        nameProduct.push(element.name);
        stock.push(element.stock);
      });

      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data: {
          labels: nameProduct,
          datasets: [{
            label: 'Productos',
            data: stock,
            backgroundColor: '#9ad0f5'
          }]
        },
        options: {
          scales: {
            x: {
        display: false // Oculta eje X completo (nombres y líneas)
      },
            y: {
              display: false,
              beginAtZero: true
            }
          },
          plugins: {
      legend: {
        display: true // Mantiene el cuadrito de "Productos"
      }
    }
        }
        
      });
       this.chartDoughnut = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: nameProduct,
          datasets: [{
            label: 'Productos',
            data: stock
          }]
        },
        options: {
          scales: {
            x: {
        display: false // Oculta eje X completo (nombres y líneas)
      },
            y: {
              display: false,
              beginAtZero: true
            }
          },
          plugins: {
      legend: {
        display: true // Mantiene el cuadrito de "Productos"
      }
    }
        }
        
      });
      
    }
  }
}
