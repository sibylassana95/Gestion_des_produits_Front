import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produits.model';
import { ProduitsService } from '../../service/produits.service';
import { Image } from '../../models/image.model';
import { freeSet } from '@coreui/icons';
import { TotalProduitsService } from '../../service/total-produits.service';
import { Categorie } from 'src/app/models/categorie.model';

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

  datawigets: any[] = [];
  options: any[] = [];

  constructor(
    private produitService: ProduitsService,
    private totalProduitsService: TotalProduitsService
  ) {}

  ngOnInit(): void {
    this.chargerApplication();
    this.chargerCategorie();
  }

  chargerApplication() {
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
}
