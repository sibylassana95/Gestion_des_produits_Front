import { Categorie } from './categorie.model';
import { Image } from './image.model';
export class Produit {
  idProduits!: number;
  nomProduits!: string;
  prixProduits!: number;
  dateCreation!: Date;
  image!: Image;
  imageStr!: string;
  categorie!: Categorie;
}
