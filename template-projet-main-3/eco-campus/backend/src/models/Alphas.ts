export class Alphas {
  private coeff_ratio: Map<string, number>;
  private coeff_op: Map<string, number>;

  // constructeur : prendre les ratios de la table ratios 
  private constructor(coeff_ratio: Map<string, number>,coeff_op: Map<string, number>) {
    this.coeff_ratio = coeff_ratio;
    this.coeff_op = coeff_op;
  }

  //ajouter validation du format 

  // factory method  NOT SUREEEE
  public static createFromRaw(raw: {
    coeff_ratio: Record<string, number>,
    coeff_op: Record<string, number>
  }): Alphas {
    const ratioMap = new Map<string, number>(Object.entries(raw.coeff_ratio));
    const opMap = new Map<string, number>(Object.entries(raw.coeff_op));
    return new Alphas(ratioMap, opMap);
  }

  
  public getCoeffRatio(): Map<string, number> {
    return this.coeff_ratio;
  }

  public setCoeffRatio(value: Map<string, number>): void {
    this.coeff_ratio = value;
  }

  public getCoeffOp(): Map<string, number> {
    return this.coeff_op;
  }

  public setCoeffOp(value: Map<string, number>): void {
    this.coeff_op = value;
  }
}
