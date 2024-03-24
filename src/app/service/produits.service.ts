import { Produit } from './../models/produits.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';
import { Image } from './../models/image.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  private baseUrl: string = `${environment.apiURL}/api/produits/all`;
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
    return this.http.get(`${this.baseUrl}`).pipe(
      map((response) => this.handleResponse<Produit[]>(response)),
      catchError((error) => this.handleError(error))
    );
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.apiURL + '/api/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${environment.apiURL + '/api/image/get/info'}/${id}`;
    return this.http.get<Image>(url, {
      headers: { Accept: 'application/json' },
    });
  }
}
