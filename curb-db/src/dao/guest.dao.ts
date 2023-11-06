import {ApiProperty} from "@nestjs/swagger";

export class GuestDto {
  @ApiProperty({
    description: 'ID of the `Fleet` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'ID of the `User` that created this entry',
    nullable: false,
    type: Number,
    required: true,
  })
  creatorId: number;

  @ApiProperty({
    description: 'Uniquely Guest ID',
    nullable: false,
    type: String,
    required: true,
  })
  guestId: string;

  @ApiProperty({
    description: 'Uniquely Guest ID Source',
    nullable: false,
    type: String,
    required: true,
  })
  guestIdSource: string;

  @ApiProperty({
    description: 'Indicates whether or not the guest is blacklisted',
    nullable: false,
    type: Boolean,
    required: false,
    default: false,
  })
  blacklisted: boolean;

  @ApiProperty({
    description: 'First Name',
    nullable: false,
    type: String,
    required: true,
  })
  firstName: string;

  @ApiProperty({
    description: 'Middle Name',
    nullable: true,
    type: String,
    required: false,
  })
  middleName?: string;

  @ApiProperty({
    description: 'Last Name',
    nullable: false,
    type: String,
    required: true,
  })
  lastName: string;

  @ApiProperty({
    description: 'Data',
    nullable: true,
    type: Object,
    required: false,
  })
  data: any;

  @ApiProperty({
    description: 'Incomplete flag from data',
    nullable: true,
    type: Boolean,
  })
  incomplete?: boolean;

}
