import { Request } from 'express';

/**
 * @description {string | object} 디코드 추가 타입 정의
 */

export interface DecodedRequest extends Request {
  decoded: string | object;
}
