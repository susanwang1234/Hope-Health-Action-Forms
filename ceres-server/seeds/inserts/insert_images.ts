import { Knex } from 'knex';

export async function insertImages(knex: Knex): Promise<void> {
  await knex('Image').insert([
    { id: 1, filename: '1635555555555_default_user.png', filepath: 'assets/1635555555555_default_user.png', mimetype: 'image/png', size: 16608 },
    { id: 2, filename: '1636882363421_diamond.jpg', filepath: 'assets/1636882363421_diamond.jpg', mimetype: 'image/jpeg', size: 639309 },
    { id: 3, filename: '1637015175204_heart.jpg', filepath: 'assets/1637015175204_heart.jpg', mimetype: 'image/jpeg', size: 643774 }
  ]);
}
