import {ApiProperty} from "@nestjs/swagger";

export class FleetCarDto {
  @ApiProperty({
    description: 'ID of the `FleetCar` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'ID of the `Fleet` that this car belongs to.',
    nullable: false,
    type: Number,
  })
  fleetId: number;

  @ApiProperty({
    description: 'ID of the `CarTrim` of the car.',
    nullable: false,
    type: Number,
  })
  carTrimId: number;

  @ApiProperty({
    description: 'JSONB object containing data about the fleet car.',
    nullable: false,
    type: Object,
    required: true,
  })
  data: any;
}
