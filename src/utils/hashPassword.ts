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