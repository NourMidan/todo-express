import { Request } from 'express';
import { Task, User } from '@prisma/client';

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface userData {
  email: string;
  id: string;
  tasks: Task[];
}

export interface userResponse extends Request {
  user: userData;
}

export interface userResponseWithToken extends userResponse {
  token: string;
}
