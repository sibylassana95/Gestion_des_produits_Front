import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/models/produits.model';
import { ProduitsService } from 'src/app/service/produits.service';
import { Image } from '../../../models/image.model';
import { Categorie } from 'src/app/models/categorie.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrl: './update-produit.component.scss',
})
export class UpdateProduitComponent implements OnInit {
  currentProduit = new Produit();
  newProduit = new Produit();
  updateId!: number;
  produits?: Produit[];
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitsService
  ) {}
  ngOnInit(): void {
    this.produitService
      .consulterProduit(this.activatedRoute.snapshot.params['id'])
      .subscribe((app) => {
        this.currentProduit = app;
        this.updateId = this.currentProduit.idProduits;

        this.produitService
          .loadImage(this.currentProduit.image.idImage)
          .subscribe((img: Image) => {
            this.myImage = 'data:' + img.type + ';base64,' + img.image;
          });
      });
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  updateProduit() {
    this.newProduit.categorie = this.categories.find(
      (cat) => cat.idCat == this.newIdCat
    )!;
    if (this.isImageUpdated) {
      this.produitService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentProduit.image = img;
          this.produitService
            .updateProduit(this.currentProduit)
            .subscribe((prod) => {
              this.router.navigate(['produits']);
            });
        });
    } else {
      this.produitService
        .updateProduit(this.currentProduit)
        .subscribe((prod) => {
          this.router.navigate(['produits']);
        });
    }
  }
}
