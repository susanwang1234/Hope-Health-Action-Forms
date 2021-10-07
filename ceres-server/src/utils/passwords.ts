import bcrypt from 'bcrypt';

export async function generateHash(password: string) {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function compareHash(password: string, hashed: string) {
  const isSame = await bcrypt.compare(password, hashed);
  return isSame;
}
