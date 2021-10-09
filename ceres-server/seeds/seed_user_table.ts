import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('User').del();

  // Inserts seed entries
  await knex('User').insert([{ id: 1, username: 'admin', password: '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm', departmentId: 1, roleId: 1 }]);
}
