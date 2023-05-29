import {ApiProperty} from "@nestjs/swagger";

export class ContactDto {
  @ApiProperty({
    description: 'ID of the `Contact` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'First name of the contact',
    type: String,
    nullable: false,
    required: true,
  })
  firstName: string;

  @ApiProperty({
    description: 'Middle name of the contact',
    type: String,
    required: false,
  })
  middleName?: string;

  @ApiProperty({
    description: 'Last name of the contact',
    type: String,
    nullable: false,
    required: true,
  })
  lastName: string;

  @ApiProperty({
    description: 'Other or Preferred name of the contact',
    type: String,
    nullable: false,
    required: true,
  })
  otherName?: string;

  @ApiProperty({
    description: 'ID of the `Address` record associated with this contact record',
    type: Number,
    required: true,
    nullable: false,
  })
  addressId: number;

  @ApiProperty({
    description: 'ID of the `Phone` record associated with this contact record',
    type: Number,
    required: true,
    nullable: false,
  })
  phoneId: number;

}