import { apiClient } from "./client";

export interface ChildApi {
  id: string;
  nickname: string;
  avatar?: string;
  birthDate?: string;
  createdAt: string;
}

export interface CreateChildDto {
  nickname: string;
  avatar?: string;
  birthDate?: string;
}

export async function getChildren(): Promise<ChildApi[]> {
  const res = await apiClient.get("/users/me/children");
  return res.data;
}

export async function createChild(dto: CreateChildDto): Promise<ChildApi> {
  const res = await apiClient.post("/users/me/children", dto);
  return res.data;
}
