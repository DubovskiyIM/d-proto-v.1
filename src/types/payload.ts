export interface Payload {
  username: string;
  password: string;
  seller?: boolean;
  iat?: number;
  expiresIn?: string;
}
