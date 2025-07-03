import { institutionData } from './institutionData';

export class institutionCollection {
  institutions: institutionData[];

  constructor(institutions: institutionData[] = []) {
    this.institutions = institutions;
  }
}
