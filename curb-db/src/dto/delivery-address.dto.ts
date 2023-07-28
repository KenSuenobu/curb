import { ApiProperty } from "@nestjs/swagger";

export class DeliveryAddressDto {
  @ApiProperty({
    description: 'ID of the `DeliveryAddress` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'Fleet ID associated with the address',
    nullable: false,
    type: Number,
    required: true,
  })
  fleetId: number;

  @ApiProperty({
    description: 'Name of the Delivery Location',
    nullable: false,
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Data containing the address',
    nullable: false,
    type: Object,
    required: true,
  })
  data: any;
}