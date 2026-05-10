import { apiClient } from "./client";

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    nickname?: string;
    name?: string;
    avatar?: string;
    role?: string;
  };
}

export async function guestLogin(nickname?: string): Promise<LoginResponse> {
  const res = await apiClient.post("/auth/guest", { nickname });
  return res.data;
}

export async function wechatLogin(
  code: string,
  nickname?: string,
  avatar?: string,
): Promise<LoginResponse> {
  const res = await apiClient.post("/auth/wechat", { code, nickname, avatar });
  return res.data;
}
