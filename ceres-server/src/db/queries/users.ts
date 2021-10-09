import { MysqlResponse } from 'db/models/response';
import { UsersTable } from 'db/models/users';
import { Query } from '../mysql';

const find = (column: string, value: string) => Query<UsersTable[]>('SELECT * FROM User WHERE ?? = ?', [column, value]);
const insert = () => Query<MysqlResponse>('', []);

export default {
  find,
  insert
};
