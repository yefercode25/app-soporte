import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err: any, salt: any) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, function(err: any, hash: any) {
        if (err) {
          reject(err);
        }
        
        resolve(hash);
      });
    });
  });
};