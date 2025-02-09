// Interface para LoginDto
export interface ILoginDto {
  email: string;
  password: string;
}

// Interface para RefreshResponseDto
export interface IRefreshResponseDto {
  access_token: string;
  access_token_expires_at: number;
  refresh_token: string;
}

// Interface para RefreshTokenDto
export interface IRefreshTokenDto {
  refreshToken: string;
}

export interface ILoginResponseDto {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  access_token: string;
  access_token_expires_at: number;
  refresh_token: string;
}
