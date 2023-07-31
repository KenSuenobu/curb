import {ApiProperty} from '@nestjs/swagger';

export class TollDto {
  @ApiProperty({
    description: 'ID of the `Toll` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'ID of the `Trip` object associated with this toll',
    nullable: true,
    type: Number,
  })
  tripId: number;

  @ApiProperty({
    description: 'Date and time of the toll',
    nullable: true,
    type: Date,
  })
  tollTime: Date;

  @ApiProperty({
    description: 'Location of the toll',
    nullable: true,
    type: String,
  })
  tollLocation: string;

  @ApiProperty({
    description: 'Toll amount',
    nullable: true,
    type: Number,
  })
  tollAmount: number;
}