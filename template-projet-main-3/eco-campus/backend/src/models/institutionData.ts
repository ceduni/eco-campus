export class institutionData {
  id_institution: string;
  ratios: { [id_ratio: string]: number };

  constructor(id_institution: string, ratios: { [id_ratio: string]: number }) {
    this.id_institution = id_institution;
    this.ratios = ratios;
  }
}
