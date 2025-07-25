export class InstitutionData {
  id_institution: string;
  name: string;
  lat: number; 
  lng: number;
  type: string;
  logo : string;

  constructor(id_institution: string,
    name: string,
    lat: number,
    lng: number,
    type: string,
    logo : string)
    {
      this.id_institution=id_institution;
      this.name=name;
      this.lat=lat;
      this.lng=lng;
      this.type=type;
      this.logo=logo;
  }
}


