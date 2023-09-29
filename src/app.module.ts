import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
})
export class AppModule {}
