export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export class UserModel {
  constructor(private data: User) {}

  get fullName(): string {
    return this.data.name;
  }

  get email(): string {
    return this.data.email;
  }
}
