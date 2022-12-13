import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Guard para validar si el token es valido
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
