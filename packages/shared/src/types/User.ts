export interface User {
  id: string;
  openId?: string;
  unionId?: string;
  phone?: string;
  nickname?: string;
  name?: string;
  avatar?: string;
  role?: "PARENT" | "CHILD" | "parent" | "child";
  parentId?: string;
  birthDate?: string;
  birthday?: string;
  currentLevel?: number;
  age?: number;
  createdAt?: string;
  updatedAt?: string;
}
