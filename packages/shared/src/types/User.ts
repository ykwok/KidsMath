export type Role = "PARENT" | "CHILD";

export interface User {
  id: string;
  openId?: string;
  unionId?: string;
  phone?: string;
  nickname?: string;
  avatar?: string;
  role: Role;
  parentId?: string;
  birthDate?: string;
  children?: User[];
  createdAt: string;
  updatedAt: string;
}
