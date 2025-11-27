export interface AdminUserResponseDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface UpdateUserRolesRequestDto {
  roles: string[]; 
}