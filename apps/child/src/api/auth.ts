import apiClient from "./client";
import type { User } from "@kidsmath/shared";

export interface GuestLoginResponse {
  token: string;
  user: User;
}

export async function guestLogin(
  nickname?: string,
): Promise<GuestLoginResponse> {
  return apiClient.post("/auth/guest", { nickname });
}

export function mapBackendUserToFrontend(backendUser: User): User {
  return {
    ...backendUser,
    role: backendUser.role?.toLowerCase() as "parent" | "child" | undefined,
    birthday: backendUser.birthDate || backendUser.birthday,
  };
}
