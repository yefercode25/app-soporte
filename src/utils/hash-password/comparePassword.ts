import bcrypt from 'bcrypt';

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err: any, result: any) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};