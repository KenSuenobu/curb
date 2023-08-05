import {ApiProperty} from '@nestjs/swagger';

export class FleetCarMaintenanceDto {
  @ApiProperty({
    description: 'ID of the `FleetCarMaintenance` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'ID of the Fleet Car',
    nullable: false,
    type: Number,
    required: true,
  })
  fleetCarId: number;

  @ApiProperty({
    description: 'Date and time of the maintenance performed',
    nullable: false,
    type: Date,
    required: true,
  })
  maintenanceTime: Date;

  @ApiProperty({
    description: 'Type of maintenance that was performed',
    nullable: false,
    type: String,
    required: true,
  })
  maintenanceType: string;

  @ApiProperty({
    description: 'Maintenance detail note',
    nullable: false,
    type: String,
    required: true,
  })
  note: string;

  @ApiProperty({
    description: 'Cost of the maintenance performed',
    nullable: false,
    type: Number,
    required: true,
  })
  cost: number;
}