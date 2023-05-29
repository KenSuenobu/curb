import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    description: 'ID of the `Address` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'First line of the address',
    nullable: false,
    type: String,
    required: true,
  })
  address1: string;

  @ApiProperty({
    description: 'Second line of the address',
    nullable: true,
    type: String,
  })
  address2?: string;

  @ApiProperty({
    description: 'City of the address',
    nullable: false,
    type: String,
    required: true,
  })
  city: string;

  @ApiProperty({
    description: 'State/Province of the address',
    nullable: false,
    type: String,
    required: true,
  })
  stateProvince: string;

  @ApiProperty({
    description: 'Zipcode of the address',
    nullable: false,
    type: String,
    required: true,
  })
  zipcode: string;

  @ApiProperty({
    description: 'Country of the address',
    nullable: false,
    type: String,
    required: true,
    default: 'United States',
  })
  country: string;
}

