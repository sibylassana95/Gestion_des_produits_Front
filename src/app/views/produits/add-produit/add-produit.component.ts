import { Categorie } from 'src/app/models/categorie.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produits.model';
import { ProduitsService } from 'src/app/service/produits.service';
import { Image } from 'src/app/models/image.model';
@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.scss',
})
export class AddProduitComponent implements OnInit {
  newProduit = new Produit();
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  uploadedImage!: File;
  imagePath: any;
  myForm!: FormGroup;
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nomProduits: ['', [Validators.required]],
      prixProduits: ['', [Validators.required]],
      dateCreation: ['', [Validators.required]],
      image: ['', [Validators.required]],
      idCat: ['', [Validators.required]],
    });
    this.produitsService.listeCategories().subscribe((cats) => {
      this.categories = cats;
      console.log(cats);
    });
  }
  constructor(
    private produitsService: ProduitsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }

  addProduit() {
    this.newProduit.categorie = this.categories.find(
      (cat) => cat.idCat == this.newIdCat
    )!;
    this.produitsService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newProduit.image = img;

        this.produitsService
          .ajouterProduits(this.newProduit)
          .subscribe((app) => {
            console.log(app);
            this.router.navigate(['produits']);
          });
      });
  }
}
