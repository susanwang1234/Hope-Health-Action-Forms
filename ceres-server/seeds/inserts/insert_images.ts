import { Knex } from 'knex';

export async function insertImages(knex: Knex): Promise<void> {
  await knex('Image').insert([{ id: 1, filename: '1636882363421_diamond.jpg', filepath: 'assets/1636882363421_diamond.jpg', mimetype: 'image/jpeg', size: 639309 }]);
}
