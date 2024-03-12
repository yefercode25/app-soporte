import crypto from 'crypto';

export const decryptPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let key = crypto.createHash('sha256').update(String(process.env.CRYPTO_SECRET)).digest('base64').substr(0, 32);
    
    if (!key) {
      reject(new Error('CRYPTO_SECRET environment variable is not defined'));
      return;
    }

    const passwordParts = password.split(':');
    const iv = Buffer.from(passwordParts.shift() || '', 'hex');
    const encryptedPassword = passwordParts.join(':');

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decryptedPassword = '';
    try {
      decryptedPassword += decipher.update(encryptedPassword, 'hex', 'utf8');
      decryptedPassword += decipher.final('utf8');
      resolve(decryptedPassword);
    } catch (error) {
      reject(error);
    }
  });
}