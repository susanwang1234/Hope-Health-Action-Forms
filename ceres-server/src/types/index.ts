import { Request } from 'express';

export interface ReqUser extends Request {
  user?: {
    id?: number;
    pwd?: string;
    username?: string;
    roleName?: string;
    departmentName?: string;
  };
}
