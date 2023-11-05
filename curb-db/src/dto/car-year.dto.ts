import { ApiProperty } from "@nestjs/swagger";

export class CarYearDto {
  @ApiProperty({
    description: 'ID of the `CarYear` object, auto-numbered and set if null.',
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
    description: 'ID of the `CarModel` object',
    nullable: false,
    type: Number,
    required: true,
  })
  carModelId: number;

  @ApiProperty({
    description: 'Year of the Model',
    nullable: false,
    type: Number,
    required: true,
  })
  year: number;
}