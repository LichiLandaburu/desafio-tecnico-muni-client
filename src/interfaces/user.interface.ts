
export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  dni: string;
  birthday: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}