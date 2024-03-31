import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { ProduitsService } from 'src/app/service/produits.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrl: './update-categorie.component.scss',
})
export class UpdateCategorieComponent implements OnInit {
  currentCategorie = new Categorie();
  newCategorie = new Categorie();
  updateId!: number;
  produits?: Categorie[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitsService
  ) {}
  ngOnInit(): void {
    this.produitService
      .consulterCategorie(this.activatedRoute.snapshot.params['id'])
      .subscribe((app) => {
        this.currentCategorie = app;
        this.updateId = this.currentCategorie.idCat;
      });
  }

  updateCategorie() {
    this.produitService
      .updateCategorie(this.currentCategorie)
      .subscribe((prod) => {
        this.router.navigate(['categories']);
      });
  }
}
