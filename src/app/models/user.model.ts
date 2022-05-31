import { environment } from 'src/environments/environment';

const base_url = environment.baseUrL;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public uid?: string
  ) {}

  get imgUrl() {
    if (this.img?.includes('https')) {
      return this.img;
    }

    if (this.img) {
      return `${base_url}/upload/users/${this.img}`;
    } else {
      return `${base_url}/upload/users/no-image.png`;
    }
  }
}
