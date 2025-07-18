export class Alphas {
  private coeff_ratio: Map<string, number>;
  private coeff_op: Map<string, number>;


  constructor(coeff_ratio: Map<string, number>,coeff_op: Map<string, number>) {
    this.coeff_ratio = coeff_ratio;
    this.coeff_op = coeff_op;
  }

 public static fromJSON(obj: any): Alphas {
  const instance = Object.create(Alphas.prototype) as Alphas;
  instance.coeff_ratio = new Map(Object.entries(obj.coeff_ratio || {}));
  instance.coeff_op = new Map(Object.entries(obj.coeff_op || {}));       
  return instance;
}


  //ajouter validation du format 


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
