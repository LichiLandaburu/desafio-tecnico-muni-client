
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  dni: string;
}

export interface UpdateData {
  name?: string;
  lastname?: string;
  email?: string;
  birthday?: string;
  dni?: string;
}