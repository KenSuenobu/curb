import {ApiHideProperty, ApiProperty} from '@nestjs/swagger';

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
    description: 'Owner ID of the `FleetCar` that this car belongs to.',
    nullable: false,
    type: Number,
  })
  ownerId: number;

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

  @ApiHideProperty()
  trimName: string;

  @ApiHideProperty()
  carYear: string;

  @ApiHideProperty()
  modelName: string;

  @ApiHideProperty()
  makeName: string;

  @ApiHideProperty()
  color: string;

  @ApiHideProperty()
  licensePlate: string;

}
