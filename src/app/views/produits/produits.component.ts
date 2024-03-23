import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produits.model';
import { ProduitsService } from '../../service/produits.service';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-produits',
  //standalone: true,
  // imports: [],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss',
})
export class ProduitsComponent implements OnInit {
  data?: Produit[];

  constructor(private produitService: ProduitsService) {}

  ngOnInit(): void {
    this.chargerApplication();
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
    });
  }
}
