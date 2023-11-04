import {ApiProperty} from "@nestjs/swagger";

export class CarMakeDto {
  @ApiProperty({
    description: 'ID of the `CarMake` object, auto-numbered and set if null.',
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
    description: 'Name of the Make',
    nullable: false,
    type: String,
    required: true,
  })
  name: string;
}