import {ApiProperty} from "@nestjs/swagger";

export class CarTrimInfoDto {
  @ApiProperty({
    description: 'ID of the `CarTrimInfo` object, auto-numbered and set if null.',
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
    description: 'ID of the `CarTrim` object',
    nullable: false,
    type: Number,
    required: true,
  })
  carTrimId: number;

  @ApiProperty({
    description: 'Data stored for the trim information',
    nullable: false,
    type: Object,
    required: true,
  })
  data: any;
}
