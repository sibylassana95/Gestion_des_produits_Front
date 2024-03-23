import { Image } from './image.model';
export class Produit {
  idProduits!: number;
  nomProduits!: string;
  prixProduits!: number;
  dateCreation!: Date;
  image!: Image;
  imageStr!: string;
}
