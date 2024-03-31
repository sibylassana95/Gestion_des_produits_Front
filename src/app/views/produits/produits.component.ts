import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produits.model';
import { ProduitsService } from '../../service/produits.service';
import { Image } from '../../models/image.model';
import { freeSet } from '@coreui/icons';
import { TotalProduitsService } from '../../service/total-produits.service';
import { Categorie } from 'src/app/models/categorie.model';
import Swal from 'sweetalert2';

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
    if (!this.data || !this.searchTerm) {
      return this.data || [];
    } else {
      return this.data.filter((produit: Produit) =>
        produit.nomProduits
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
