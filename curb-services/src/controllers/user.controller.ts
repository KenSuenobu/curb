import {Controller, Get, HttpStatus, Logger, Param} from '@nestjs/common';
import {ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {UserService} from '../services/user.service';
import {UserDto} from 'curb-db/dist';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger('user.controller');

  constructor(private readonly service: UserService) {}

  @Get('/login/:user/:pass')
  @ApiOperation({
    summary: 'Login for a user',
    description: 'Login for a user/pass, returning ',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: String,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async login(@Param('user') username: string, @Param('pass') password: string): Promise<string> {
    return this.service.login(username, password);
  }

  @Get('/login/:jwt')
  @ApiOperation({
    summary: 'Get user information by JWT',
    description: 'Retrieves `UserDto` object based on the JWT token specified',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getLoginForJwt(@Param('jwt') jwt: string): Promise<UserDto> {
    return this.service.getUserInfo(jwt);
  }

}