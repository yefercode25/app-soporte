import crypto from 'crypto';

export const encryptPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let key = crypto.createHash('sha256').update(String(process.env.CRYPTO_SECRET)).digest('base64').substr(0, 32);
    
    if (!key) {
      reject(new Error('CRYPTO_SECRET environment variable is not defined'));
      return;
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    resolve(iv.toString('hex') + ':' + encryptedPassword);
  });
}