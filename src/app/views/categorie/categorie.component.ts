import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { Categorie } from 'src/app/models/categorie.model';
import { ProduitsService } from 'src/app/service/produits.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss',
})
export class CategorieComponent implements OnInit {
  categories?: Categorie[];
  icons = freeSet;
  searchTerm: any;
  sortOrder: string = 'asc';
  constructor(private produitService: ProduitsService) {}

  ngOnInit(): void {
    this.chargerCategorie();
  }

  chargerCategorie() {
    this.produitService.listeCategories().subscribe((produits) => {
      this.categories = produits;
    });
  }
  supprimerCategorie(app: Categorie) {
    let conf = Swal.fire({
      title: 'Etes-vous sûr ?',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      icon: 'info',
    });

    conf.then((result) => {
      if (result.isConfirmed) {
        this.produitService.supprimerCategorie(app.idCat).subscribe(() => {
          this.chargerCategorie();
          window.location.reload();
        });
      }
    });
  }

  filteredData(): Categorie[] {
    let filteredProducts: Categorie[] = [];
    if (!this.categories || !this.searchTerm) {
      filteredProducts = this.categories || [];
    } else {
      filteredProducts = this.categories.filter((produit: Categorie) =>
        produit.nomCat.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.sortOrder === 'asc') {
      filteredProducts.sort((a, b) => (a.nomCat > b.nomCat ? 1 : -1));
    } else if (this.sortOrder === 'desc') {
      filteredProducts.sort((a, b) => (a.nomCat < b.nomCat ? 1 : -1));
    }

    return filteredProducts;
  }

  toggleSortOrder() {
    if (this.sortOrder === 'asc') {
      this.sortOrder = 'desc';
    } else {
      this.sortOrder = 'asc';
    }
  }

  exportToExcel(): void {
    const fileName = 'categories.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData());
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Categories');
    XLSX.writeFile(wb, fileName);
  }
  exportToPdf(): void {
    const doc = new jsPDF();
    const data = this.filteredData().map((categorie) => [
      categorie.nomCat,
      categorie.descriptionCat,
    ]);
    doc.text('Liste des catégories', 15, 10);
    (doc as any).autoTable({
      head: [['Nom', 'Description']],
      body: data,
    });

    doc.save('categories.pdf');
  }
}
