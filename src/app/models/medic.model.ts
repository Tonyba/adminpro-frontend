import { Hospital } from './hospital.model';

interface _MedicUser {
  _id: string;
  name: string;
  img: string;
}

export class Medic {
  constructor(public name: string, public img?: string, public uid?: string, public user?: _MedicUser, public hospital?: any) {}
}
