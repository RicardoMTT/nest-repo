import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

// @ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file')) //'file' debe ser el nombre que envies en el name por front
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        //Comprueba si el tipo MIME de un archivo dado coincide con el valor dado.
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({
            fileType: 'jpeg',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt) as any;
    const userId = json.id;
    return this.authService.updateUser(updateUserDto, file, userId);
  }

  @Get('user')
  getUser(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt) as any;
    const userId = json.id;
    return this.authService.getUser(userId);
  }

  @Get('photos')
  getPhotosByProfile(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt) as any;
    const userId = json.id;
    return this.authService.getPhotosByProfile(userId);
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
