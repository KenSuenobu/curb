import {ApiProperty} from "@nestjs/swagger";

export class CarModelDto {
  @ApiProperty({
    description: 'ID of the `CarModel` object, auto-numbered and set if null.',
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
    description: 'ID of the `CarMake` object',
    nullable: false,
    type: Number,
    required: true,
  })
  carMakeId: number;

  @ApiProperty({
    description: 'Name of the Model',
    nullable: false,
    type: String,
    required: true,
  })
  name: string;
}
