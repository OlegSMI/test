export interface IUserDto {
  id: number;
  name: string;
  avatarUrl: string | null;
  userNumber: number;
  vip: boolean;
}

export interface IUserAccess {
  kitchen: boolean;
  task: boolean;
}
