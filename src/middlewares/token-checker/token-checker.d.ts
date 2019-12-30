import { Request } from 'express';

/**
 * @description 추가 타입 정의
 */

export default interface DecodedRequest extends Request {
  decoded: string | object;
}
