import { Request } from 'express';
import { User } from '../db/types/userType';

export interface ReqUser extends Request {
  user?: User | Payload;
}

export interface Payload {
  id: number;
  username: string;
  roleName: string;
  departmentName: string;
}
