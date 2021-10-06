import { MysqlResponse } from 'db/models/response';
import { UsersTable } from 'db/models/users';
import { Query } from '../mysql';

const find = () => Query<UsersTable[]>('', []);
const insert = () => Query<MysqlResponse>('', []);

export default {
  find,
  insert
};
