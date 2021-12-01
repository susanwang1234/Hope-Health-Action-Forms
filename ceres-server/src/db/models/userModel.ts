import { Knex } from '../mysql';

// template to find a user corresponding to any type of column value
const findOne = (columnName: string, val: any) => {
  return Knex('User')
    .select(['User.id', 'User.username', 'User.password', 'Department.id as departmentId', 'Role.id as roleId', 'Role.name as roleName'])
    .leftJoin('Role', 'User.roleId', 'Role.id')
    .leftJoin('Department', 'User.departmentId', 'Department.id')
    .where(columnName, val)
    .first();
};

export default {
  findOne
};
