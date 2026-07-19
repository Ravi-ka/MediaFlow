export interface RegisterUserRequestInterface {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface LoginUserRequestInterface {
  email: string;
  password: string;
}

export interface UserRecord {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  username: string;
}