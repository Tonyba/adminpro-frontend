interface _HospitalUser {
  _id: string;
  name: string;
  img: string;
}

export class Hospital {
  constructor(public name: string, public uid?: string, public img?: string, public user?: _HospitalUser) {}
}
