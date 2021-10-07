import { Request } from 'express';

export interface ReqUser extends Request {
  user?: {
    id?: number;
    username?: string;
    roleName?: string;
    departmentName?: string;
  };
}
