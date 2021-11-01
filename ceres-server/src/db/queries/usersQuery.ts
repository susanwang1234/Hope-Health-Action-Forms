import { MysqlResponse } from 'db/models/responseModel';
import { UsersTable } from 'db/models/usersModel';
import { Query } from '../mysql';

const find = (column: string, value: string) => Query<UsersTable[]>('SELECT * FROM User WHERE ?? = ?', [column, value]);
const insert = () => Query<MysqlResponse>('', []);

export default {
  find,
  insert
};
