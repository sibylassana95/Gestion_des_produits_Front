import { Produit } from './../models/produits.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';
import { Image } from './../models/image.model';
import { Categorie } from '../models/categorie.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Produit/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  private baseUrl: string = `${environment.apiURL}/api`;
  constructor(private http: HttpClient, private authService: AuthService) {}

  public handleError(error: any): Observable<never> {
    console.error('Erreur survenue: ', error);
    let errorMessage =
      'Une erreur inattendue est survenue. Veuillez réessayer plus tard.';
    if (error.error instanceof ErrorEvent) {
      // Une erreur côté client ou un problème réseau
      errorMessage = `Une erreur est survenue:: ${error.error.message}`;
    } else if (error.error && typeof error.error.message === 'string') {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Erreur Serveur ${error.status}: ${error.statusText}`;
    } else if (error instanceof Error) {
      errorMessage = `Erreur serveur: ${error}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  private handleResponse<T>(response: any): T {
    return response as T;
  }

  getAllProduits(): Observable<Produit[]> {
    return this.http.get(`${this.baseUrl + '/produits/all'}`).pipe(
      map((response) => this.handleResponse<Produit[]>(response)),
      catchError((error) => this.handleError(error))
    );
  }
  ajouterProduits(app: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.baseUrl + '/produits/addprod', app);
  }
  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.baseUrl}/produits/getbyid/${id}`;
    return this.http.get<Produit>(url);
  }
  updateProduit(app: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.baseUrl + '/produits/updateprod', app);
  }
  supprimerProduit(id: number) {
    const url = `${this.baseUrl + '/produits/delprod'}/${id}`;
    return this.http.delete(url);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.baseUrl + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.baseUrl + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
  listeCategories(): Observable<Categorie[]> {
    return this.http.get(`${this.baseUrl + '/categorie/all'}`).pipe(
      map((response) => this.handleResponse<Categorie[]>(response)),
      catchError((error) => this.handleError(error))
    );
  }
  supprimerCategorie(id: number) {
    const url = `${this.baseUrl + '/categorie/del'}/${id}`;
    return this.http.delete(url);
  }
  ajouterCategorie(app: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.baseUrl + '/categorie/add', app);
  }
  consulterCategorie(id: number): Observable<Categorie> {
    const url = `${this.baseUrl}/categorie/getbyid/${id}`;
    return this.http.get<Categorie>(url);
  }
  updateCategorie(app: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(this.baseUrl + '/categorie/update', app);
  }
}
