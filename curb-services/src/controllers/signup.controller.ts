import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {Body, Controller, HttpStatus, Logger, Post} from '@nestjs/common';
import {SignupDto} from 'curb-db/dist';
import {SignupService} from '../services/signup.service';

@ApiTags('signup')
@Controller('signup')
export class SignupController {
  private readonly logger = new Logger('signup.controller');

  constructor(private readonly service: SignupService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new Signup object',
    description: 'Creates a request to sign up',
  })
  @ApiBody({
    description: 'The Signup object to create',
    type: SignupDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Boolean,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createSignup(@Body() payload: SignupDto): Promise<boolean> {
    return this.service.createSignup(payload);
  }

}