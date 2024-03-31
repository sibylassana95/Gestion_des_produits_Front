import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { Categorie } from 'src/app/models/categorie.model';
import { ProduitsService } from 'src/app/service/produits.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss',
})
export class CategorieComponent implements OnInit {
  categories?: Categorie[];
  icons = freeSet;
  searchTerm: any;
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
    if (!this.categories || !this.searchTerm) {
      return this.categories || [];
    } else {
      return this.categories.filter((produit: Categorie) =>
        produit.nomCat.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
