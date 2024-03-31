import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TotalProduitsService {
  totalProduits: number = 0;
  constructor() {}
}
