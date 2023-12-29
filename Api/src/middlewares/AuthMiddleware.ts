import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpStatusCode from '../enums/HttpStatusCode';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      console.log('No authorization header');
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      console.log('No token');
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const { userId } = decodedToken as { userId: string };

    if (!userId) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    req.body.userId = userId;
    next();
  } catch (error) {
    console.error('Error while authenticating user: ', error);
    res.status(500).json({ message: 'Error while authenticating user', error });
  }
}
