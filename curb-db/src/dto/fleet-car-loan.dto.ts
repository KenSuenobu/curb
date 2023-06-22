import {ApiHideProperty, ApiProperty} from '@nestjs/swagger';

export class FleetCarLoanDto {
  @ApiProperty({
    description: 'ID of the `FleetCarLoan` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'ID of the `FleetCar` that this car belongs to.',
    nullable: false,
    type: Number,
  })
  fleetCarId: number;

  @ApiProperty({
    description: 'JSONB object containing data about the fleet car loan.',
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

}