export class Alphas {
  private coeff: Map<string, number>;

  // constructeur : prendre les ratios de la table ratios 
  private constructor(weights: Map<string, number>) {
    this.coeff = weights;
  }

  //ajouter validation du format 

  getAlpha(id_ratio: string): number {
    return this.coeff.get(id_ratio) ?? 1;
  }

  updateAlpha(id_ratio: string, newValue: number): void {
    this.coeff.set(id_ratio, newValue);
  }

  getAll(): Map<string, number> {
    return this.coeff;
  }
}
