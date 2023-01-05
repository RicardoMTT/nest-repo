import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

// @ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // Ruta privada
  // A menos que haya un jwt valido en la cabecera de autorizacion de la peticion http entrante, el endpoint no proporcionara una respuesta valida
  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo() {
    return {
      res: true,
    };
  }

  //   @Get('check-status')
  //   //   @Auth()
  //   checkAuthStatus(@GetUser() user: User) {
  //     return this.authService.checkAuthStatus(user);
  //   }

  @Get('private')
  //   @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    // @GetUser() user: User,
    // @GetUser('email') userEmail: string,

    // @RawHeaders() rawHeaders: string[],
    // @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Hola Mundo Private',
      //   user,
      //   userEmail,
      //   rawHeaders,
      //   headers,
    };
  }

  // @SetMetadata('roles', ['admin','super-user'])

  @Get('private2')
  // @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // @UseGuards(AuthGuard())
  // privateRoute2(@GetUser() user: User) {
  privateRoute2() {
    return {
      ok: true,
    };
  }

  //   @Get('private3')
  //   @Auth(ValidRoles.admin)
  //   privateRoute3(@GetUser() user: User) {
  //     return {
  //       ok: true,
  //       user,
  //     };
  //   }
}
