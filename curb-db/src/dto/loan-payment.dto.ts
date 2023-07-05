import {ApiProperty} from '@nestjs/swagger';

export class LoanPaymentDto {
  @ApiProperty({
    description: 'ID of the `LoanPayment` object, auto-numbered and set if null.',
    nullable: true,
    type: Number,
  })
  id?: number;

  @ApiProperty({
    description: 'Fleet Car Loan ID of the `FleetCarLoan` object.',
    nullable: false,
    type: Number,
    required: true,
  })
  fleetCarLoanId: number;

  @ApiProperty({
    description: 'Date of the car payment',
    nullable: false,
    type: Date,
    required: true,
  })
  paymentDate: Date;

  @ApiProperty({
    description: 'Principal amount from the payment',
    nullable: false,
    type: Number,
    required: true,
  })
  principalAmount: number;

  @ApiProperty({
    description: 'Interest amount from the payment',
    nullable: false,
    type: Number,
    required: true,
  })
  interestAmount: number;

  @ApiProperty({
    description: 'Total amount of the payment',
    nullable: false,
    type: Number,
    required: true,
  })
  totalAmount: number;
}