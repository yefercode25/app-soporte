import jwt from 'jsonwebtoken';

export const generateJWT = (payload: any, expiresIn: string = '1d'): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token as string);
      }
    });
  });
};

interface Decoded {
  id: string;
  email: string;
}

export const verifyJWT = (token: string): Promise<Decoded> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded as Decoded);
      }
    });
  });
};