import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ttc-calculator',
  standalone: true,
  imports: [FormsModule , CurrencyPipe],
  templateUrl: './ttccalculator.component.html',
  styleUrls: ['./ttccalculator.component.css'],
})
export class TTCCalculatorComponent {
  // Default values
  prixHT: number = 0; // Base price per unit
  quantite: number = 1; // Default quantity
  tva: number = 18; // Default TVA (tax percentage)

  // Computed properties
  get prixUnitaireTTC(): number {
    return this.prixHT * (1 + this.tva / 100);
  }

  get totalTTC(): number {
    const total = this.prixUnitaireTTC * this.quantite;
    return total - this.discount; // Apply discount
  }

  get discount(): number {
    if (this.quantite > 15) {
      return this.prixUnitaireTTC * this.quantite * 0.3; // 30% discount
    } else if (this.quantite >= 10) {
      return this.prixUnitaireTTC * this.quantite * 0.2; // 20% discount
    }
    return 0; // No discount
  }
}
