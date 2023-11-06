import {ApiProperty} from "@nestjs/swagger";

export class FleetDto {
  @ApiProperty({
    description: 'ID of the `Fleet` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'ID of the `User` that created this entry',
    nullable: false,
    type: Number,
    required: true,
  })
  creatorId: number;

  @ApiProperty({
    description: 'Name of the Fleet',
    nullable: false,
    type: String,
    required: true,
  })
  name: string;
}
