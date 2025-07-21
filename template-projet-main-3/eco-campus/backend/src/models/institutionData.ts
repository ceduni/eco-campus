export class institutionData {
  id_institution: string;
  ratios_values: { [id_ratio: string]: number };
  op_values :  { [id_op_metric: string]: number }; // nouvel attribut 
  stars_values : { [id_stars_metric: string]: number };

  constructor(id_institution: string, ratios_values: { [id_ratio: string]: number }, 
    stars_values : { [id_stars_metric: string]: number }, op_values :  { [id_stars_metric: string]: number }) {
    this.id_institution = id_institution;
    this.ratios_values = ratios_values;
    this.stars_values = stars_values; 
    this.op_values = op_values;
  }

  getIdInstitution(): string {
    return this.id_institution;
  }

  setIdInstitution(value: string): void {
    this.id_institution = value;
  }

  getOpValues():{[id_op_metric: string]: number } { 
    return this.op_values;
  }

  setOpValues(values: { [id_op_metric: string]: number } ): void {
    this.op_values = values;
  }

  getRatiosValues(): { [id_ratio: string]: number } {
    return this.ratios_values;
  }

  setRatiosValues(values: { [id_ratio: string]: number }): void {
    this.ratios_values = values;
  }

  getStarsValues(): { [id_stars_metric: string]: number } {
    return this.stars_values;
  }

  setStarsValues(values: { [id_stars_metric: string]: number }): void {
    this.stars_values = values;
  }
}
