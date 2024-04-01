import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produits.model';
import { ProduitsService } from '../../service/produits.service';
import { Image } from '../../models/image.model';
import { freeSet } from '@coreui/icons';
import { Categorie } from 'src/app/models/categorie.model';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss',
})
export class ProduitsComponent implements OnInit {
  data?: Produit[];
  categories?: Categorie[];
  icons = freeSet;
  totalProduits: number = 0;
  totalcategories: number = 0;
  searchTerm: any;
  sortOrder: string = 'asc';

  constructor(private produitService: ProduitsService) {}

  ngOnInit(): void {
    this.chargerProduit();
    this.chargerCategorie();
  }

  chargerProduit() {
    this.produitService.getAllProduits().subscribe((produits) => {
      this.data = produits;

      this.data.forEach((app) => {
        if (app.image) {
          this.produitService
            .loadImage(app.image.idImage)
            .subscribe((img: Image) => {
              app.imageStr = 'data:' + img.type + ';base64,' + img.image;
            });
        }
      });

      this.totalProduits = this.data.length;
    });
  }
  chargerCategorie() {
    this.produitService.listeCategories().subscribe((produits) => {
      this.categories = produits;
      this.totalcategories = this.categories.length;
    });
  }
  supprimerProduit(app: Produit) {
    let conf = Swal.fire({
      title: 'Etes-vous sûr ?',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      icon: 'info',
    });

    conf.then((result) => {
      if (result.isConfirmed) {
        this.produitService.supprimerProduit(app.idProduits).subscribe(() => {
          this.chargerProduit();
          window.location.reload();
        });
      }
    });
  }
  filteredData(): Produit[] {
    let filteredProducts: Produit[] = [];
    if (!this.data || !this.searchTerm) {
      filteredProducts = this.data || [];
    } else {
      filteredProducts = this.data.filter((produit: Produit) =>
        produit.nomProduits
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.sortOrder === 'asc') {
      filteredProducts.sort((a, b) => (a.nomProduits > b.nomProduits ? 1 : -1));
    } else if (this.sortOrder === 'desc') {
      filteredProducts.sort((a, b) => (a.nomProduits < b.nomProduits ? 1 : -1));
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
    const fileName = 'produit.xlsx';
    const dataWithoutImages = this.filteredData().map(
      ({ imageStr, image, ...produit }) => {
        return {
          ...produit,
          categorie: produit.categorie ? produit.categorie.nomCat : '',
        };
      }
    );

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithoutImages);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produits');
    XLSX.writeFile(wb, fileName);
  }

  exportToPdf(): void {
    const doc = new jsPDF();
    const data = this.filteredData().map((data) => [
      data.nomProduits,
      data.prixProduits,
      data.quantite,
      data.dateCreation,
      data.categorie.nomCat,
    ]);
    doc.text('Liste des produits', 15, 10);
    (doc as any).autoTable({
      head: [['Nom', 'Prix', 'Quantité', 'Date Ajout', 'Categorie']],
      body: data,
    });

    doc.save('produit.pdf');
  }
}
