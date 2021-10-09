require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST || 'ceres-database',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'HHA',
      password: process.env.MYSQL_PASS || 'password',
      database: process.env.MYSQL_DATABASE || 'ceresdb'
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seed: {
      directory: './seeds'
    }
  }
};
