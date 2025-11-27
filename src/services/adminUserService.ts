import axios from "axios";
import type {
  AdminUserResponseDto,
  UpdateUserRolesRequestDto
} from "../types/admin";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/admin/users";

export async function getAllUsers(): Promise<AdminUserResponseDto[]> {
  const response = await axios.get<AdminUserResponseDto[]>(BASE_URL);
  return response.data;
}

export async function getUserById(id: number): Promise<AdminUserResponseDto> {
  const response = await axios.get<AdminUserResponseDto>(`${BASE_URL}/${id}`);
  return response.data;
}

export async function updateUserRoles(id: number, payload: UpdateUserRolesRequestDto): Promise<AdminUserResponseDto> {
  const response = await axios.put<AdminUserResponseDto>(`${BASE_URL}/${id}/roles`, payload);
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}