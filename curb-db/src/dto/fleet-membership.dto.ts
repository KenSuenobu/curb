import {ApiProperty} from '@nestjs/swagger';

export class FleetMembershipDto {
  @ApiProperty({
    description: 'ID of the `FleetMembership` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'User ID',
    nullable: false,
    type: Number,
    required: true,
  })
  userId: number;

  @ApiProperty({
    description: 'Fleet ID',
    nullable: false,
    type: Number,
    required: true,
  })
  fleetId: number;
}