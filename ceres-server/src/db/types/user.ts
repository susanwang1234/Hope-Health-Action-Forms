export interface BasicUser {
  id: number;
}

export interface User extends BasicUser {
  username: string;
  pwd: string;
  departmentName: string;
  roleName: string;
}
