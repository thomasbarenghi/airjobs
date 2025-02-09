import * as bcrypt from 'bcrypt';

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

/**
 * Hashes a plain text password using bcrypt.
 * @param {string} plainPassword - The password to be encrypted.
 * @returns {Promise<string>} The hashed password.
 */
export const encryptPassword = async (
  plainPassword: string,
): Promise<string> => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt password');
  }
};

/**
 * Compares a plain text password with a hashed password.
 * @param {string} plainPassword - The plain password to check.
 * @param {string} hashedPassword - The hashed password to compare with.
 * @returns {Promise<boolean>} True if passwords match, false otherwise.
 */
export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Comparison error:', error);
    throw new Error('Failed to compare passwords');
  }
};
