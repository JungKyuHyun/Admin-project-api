import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Min, Max, MaxLength } from 'class-validator';

@ObjectType({ description: 'user 스키마 모델' })
export class User {
  @Field(type => ID)
  readonly id: string;

  @Field({ description: '이메일' })
  @MaxLength(255)
  email: string;

  @Field({ description: '암호' })
  @MaxLength(255)
  password: string;

  @Field({ description: '닉네임 ex) 동쪽에서 번쩍이는 홍길동' })
  @MaxLength(255)
  nickName: string;

  @Field({ description: '유저 이름 ex) 홍길동' })
  @MaxLength(20)
  userName: string;

  @Field(type => Int, {
    nullable: true,
    description: '(비트값) 1 - 사용가능, 0 - 사용 불가능',
  })
  @Min(0)
  @Max(1)
  enabled?: number;

  @Field({ nullable: true, description: '유저 img URL' })
  @MaxLength(255)
  userImage?: string;

  @Field({ nullable: true, description: '(자동) 계정 생성일' })
  readonly dateCreated?: Date;

  @Field({ nullable: true, description: '(자동) 계정 마지막 수정일' })
  readonly lastUpdated?: Date;
}
