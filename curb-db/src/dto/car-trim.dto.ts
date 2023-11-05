import {ApiProperty} from "@nestjs/swagger";

export class CarTrimDto {
  @ApiProperty({
    description: 'ID of the `CarTrim` object, auto-numbered and set if null.',
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
    description: 'ID of the `CarYear` object',
    nullable: false,
    type: Number,
    required: true,
  })
  carYearId: number;

  @ApiProperty({
    description: 'Name of the Trim',
    nullable: false,
    type: String,
    required: true,
  })
  name: string;
}
