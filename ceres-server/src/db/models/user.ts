import { User } from '../types/user';
import { db } from '../mysql';
import { OkPacket, RowDataPacket } from 'mysql2';

export const findOne = (username: string, callback: Function) => {
  const queryString = `SELECT U.id, U.username, U.pwd, D.departmentName, R.roleName 
                        FROM User AS U, Role AS R, Department AS D
                        WHERE (U.username = ? AND R.id = U.roleID AND D.id = U.departmentID)`;

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
      pwd: row.pwd,
      departmentName: row.departmentName,
      roleName: row.roleName
    };

    callback(null, user);
  });
};
