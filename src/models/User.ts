import { ObjectType, Field, ID } from 'type-graphql';

/**
 * User 스키마
 */

@ObjectType()
export class User {
  @Field(type => ID)
  readonly id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  nickName: string;

  @Field()
  userName: string;

  @Field({ nullable: true })
  enabled?: number;

  @Field({ nullable: true })
  userImage?: string;

  @Field({ nullable: true })
  readonly dateCreated?: Date;

  @Field({ nullable: true })
  readonly lastUpdated?: Date;
}
