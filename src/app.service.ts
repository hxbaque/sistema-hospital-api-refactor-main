import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Injectable()
export class AppService {
  getHello (): string {
    return 'Hello World!';
  }
}
