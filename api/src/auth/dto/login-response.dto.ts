export class LoginResponseDto {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  access_token: string;
  access_token_expires_at: number;
  refresh_token: string;
}
