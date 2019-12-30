import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import DecodedRequest from './token-checker.d';

/**
 * @description Check jwt token
 */

export const token = (
  req: DecodedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.headers.authorization;
    req.decoded = jwt.verify(
      // 나중에 더 나은 코드로 바꾸기
      req.headers.authorization as string,
      process.env.JWT_SECRET as string,
    );
    return next();
  } catch (error) {
    if (error.name === 'TkoenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: 'Expired Token',
      });
    }
  }
  return res.status(401).json({
    code: 401,
    message: 'Invalid Token',
  });
};
