import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { ProduitsService } from 'src/app/service/produits.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrl: './add-categorie.component.scss',
})
export class AddCategorieComponent implements OnInit {
  newCategorie = new Categorie();
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nomCat: ['', [Validators.required]],
      descriptionCat: ['', [Validators.required]],
    });
  }
  constructor(
    private produitsService: ProduitsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  addCategorie() {
    this.produitsService
      .ajouterCategorie(this.newCategorie)
      .subscribe((app) => {
        console.log(app);
        this.router.navigate(['categories']);
      });
  }
}
