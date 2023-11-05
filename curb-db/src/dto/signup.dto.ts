import {ApiProperty} from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'ID of the `Signup` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'Signup e-mail address',
    nullable: false,
    type: String,
    required: true,
  })
  emailAddress: string;

  @ApiProperty({
    description: 'Signup recorded IP Address',
    nullable: false,
    type: String,
    required: true,
  })
  ipAddress: string;

  @ApiProperty({
    description: 'Signup source of info',
    nullable: false,
    type: String,
    required: true,
  })
  source: string;

  @ApiProperty({
    description: 'Signup note to admin',
    nullable: false,
    type: String,
    required: true,
  })
  note: string;
}