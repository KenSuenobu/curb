import {ApiProperty} from "@nestjs/swagger";

export class TripDto {
  @ApiProperty({
    description: 'ID of the `Fleet` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'Fleet Car ID associated with this trip',
    nullable: false,
    type: Number,
    required: true,
  })
  fleetCarId: number;

  @ApiProperty({
    description: 'Guest ID associated with this trip',
    nullable: false,
    type: Number,
    required: true,
  })
  guestId: number;

  @ApiProperty({
    description: 'Delivery Address ID associated with this trip',
    nullable: false,
    type: Number,
    required: true,
  })
  deliveryAddressId: number;

  @ApiProperty({
    description: 'Externally created ID associated with this trip',
    nullable: false,
    type: String,
    required: true,
  })
  tripId: string;

  @ApiProperty({
    description: 'Trip URL record associated with this trip',
    nullable: false,
    type: String,
    required: true,
  })
  tripUrl: string;

  @ApiProperty({
    description: 'Trip start time',
    nullable: false,
    type: Date,
    required: true,
  })
  startTime: Date;

  @ApiProperty({
    description: 'Trip end time',
    nullable: false,
    type: Date,
    required: true,
  })
  endTime: Date;

  @ApiProperty({
    description: 'Total mileage recorded for this trip, 0 if none or the trip is not yet complete',
    nullable: false,
    type: Number,
    required: true,
  })
  mileage: number;

  @ApiProperty({
    description: 'Total earnings for this trip',
    nullable: false,
    type: Number,
    required: true,
  })
  earnings: number;

  @ApiProperty({
    description: 'Name of the location where the trip took place',
    type: String,
  })
  locationName?: string;

  nickname?: string;

}
