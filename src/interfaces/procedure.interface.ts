import { User } from "./user.interface";

export interface Procedure {
  id: string;
  id_user: string;
  name: string;
  lastname: string;
  email: string;
  dni: string;
  province: string;
  city: string;
  address: string;
  postal_code: number;
  telephone: string;
  detailed_document: string;
  status: string;
  user: User;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProcedure {
  name: string;
  lastname: string;
  email: string;
  dni: string;
  province: string;
  city: string;
  address: string;
  postal_code: number;
  telephone: string;
  id_user: string;
  detailed_document?: string;
}