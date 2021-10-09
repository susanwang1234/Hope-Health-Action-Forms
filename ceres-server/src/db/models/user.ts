import { User } from '../types/user';
import { db } from '../mysql';
import { OkPacket, RowDataPacket } from 'mysql2';

export const findOne = (username: string, callback: Function) => {
  const queryString = `SELECT U.id as id, U.username as username, U.password as password, D.name as departmentName, R.name as roleName
                        FROM User AS U, Role AS R, Department AS D
                        WHERE (U.username = ? AND R.id = U.roleId AND D.id = U.departmentId)`;

  db.query(queryString, username, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    if (row === undefined) {
      callback(null, undefined);
      return;
    }

    const user: User = {
      id: row.id,
      username: row.username,
      pwd: row.password,
      departmentName: row.departmentName,
      roleName: row.roleName
    };
    console.log(user);
    callback(null, user);
  });
};
