export class institutionData {
  id_institution: string;
  ratios_values: { [id_ratio: string]: number };
  stars_values : { [id_stars_metric: string]: number };

  constructor(id_institution: string, ratios_values: { [id_ratio: string]: number }, stars_values : { [id_stars_metric: string]: number }) {
    this.id_institution = id_institution;
    this.ratios_values = ratios_values;
    this.stars_values = stars_values; 
  }

  getIdInstitution(): string {
    return this.id_institution;
  }

  setIdInstitution(value: string): void {
    this.id_institution = value;
  }

  getRatiosValues(): { [id_ratio: string]: number } {
    return this.ratios_values;
  }

  setRatiosValues(values: { [id_ratio: string]: number }): void {
    this.ratios_values = values;
  }

  // Getter & Setter pour stars_values
  getStarsValues(): { [id_stars_metric: string]: number } {
    return this.stars_values;
  }

  setStarsValues(values: { [id_stars_metric: string]: number }): void {
    this.stars_values = values;
  }
}
