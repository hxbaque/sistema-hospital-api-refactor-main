import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from '../user/dto/register-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private JwtService: JwtService,
  ) {}
  /**
   * Registra un nuevo usuario.
   */
  async register(registerBody: CreateUserDto) {
    const { email, password } = registerBody;
    const usersExist = await this.userService.findOneByUsername(email);
    if (usersExist)
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    const plainToHash = await hash(password, 10);
    registerBody = { ...registerBody, password: plainToHash };
    return this.userService.create(registerBody);
  }
  /**
   * Inicia sesión de un usuario.
   */
  async login(loginBody: LoginUserDto) {
    const { email, password } = loginBody;
    // al haber el mismo nickname, buscamos todos
    const usersExist = await this.userService.findOneByUsername(email);

    if (!usersExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, usersExist.password);

    if (!checkPassword)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const payload = { id: usersExist.id };
    const token = await this.JwtService.sign(payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = usersExist;
    const data = {
      user: userWithoutPassword,
      token,
    };
    return data;
  }
}
