import {ApiProperty} from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'ID of the `User` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'User ID in UUID format',
    nullable: false,
    type: String,
    required: true,
  })
  userId: string;

  @ApiProperty({
    description: 'E-mail Address',
    nullable: false,
    type: String,
    required: true,
  })
  emailAddress: string;

  @ApiProperty({
    description: 'Password',
    nullable: false,
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'Account verified',
    nullable: false,
    type: Boolean,
    required: true,
  })
  verified: boolean;

  @ApiProperty({
    description: 'User Data object',
    nullable: true,
    type: Object,
  })
  data: any;
}