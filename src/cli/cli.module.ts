import { Module } from '@nestjs/common';
import { CliTask } from './cli.task';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  providers: [CliTask],
  imports: [CqrsModule],
})
export class CliModule {}
