import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './providers/email/email.service';
import { PrismaService } from './providers/prisma/prisma.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [EmailService, PrismaService],
  exports: [EmailService, PrismaService],
})
export class CommonModule {}
