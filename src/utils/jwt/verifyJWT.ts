import jwt from 'jsonwebtoken';

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