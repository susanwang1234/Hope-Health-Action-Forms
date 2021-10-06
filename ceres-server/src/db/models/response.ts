import { Query } from 'db/mysql';

export interface MysqlResponse {
  affectedRows?: number;
  insertId?: number;
}
