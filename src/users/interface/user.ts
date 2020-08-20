export type User = {
  userId: number;
  username: string;
  password: string;
};

export type UserInfo = Omit<User, 'password'>;
