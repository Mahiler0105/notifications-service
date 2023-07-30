import { Module } from '@nestjs/common';
import { GrpcController } from './grpc.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [GrpcController],
  imports: [CqrsModule],
})
export class GrpcModule {}
