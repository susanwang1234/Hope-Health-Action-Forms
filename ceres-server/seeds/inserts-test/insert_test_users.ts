import { Knex } from 'knex';

export async function insertTestUsers(knex: Knex): Promise<void> {
  await knex('User').insert([{ id: 1, username: 'admin', password: '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm', departmentId: 1, roleId: 1 }]);
  await knex('User').insert([{ id: 2, username: 'staff01', password: '$2a$12$Es2.DjFL5jKSukJjgXOubuP..MipNRcqM5KfzL49bdymFqAkB62r2', departmentId: 2, roleId: 4 }]);
}
