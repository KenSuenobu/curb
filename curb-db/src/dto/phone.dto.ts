import {ApiProperty} from "@nestjs/swagger";

export enum PhoneType {
  physical,
  cell_phone,
  fax
}

export class PhoneDto {
  @ApiProperty({
    description: 'ID of the `Phone` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'Phone number',
    nullable: false,
    type: String,
    required: true,
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Country Code for Phone Number',
    nullable: false,
    type: String,
    required: true,
  })
  country: string;

  @ApiProperty({
    enum: [ 'physical', 'cell_phone', 'fax' ],
    required: true,
    nullable: false,
  })
  phoneType: PhoneType;
}
