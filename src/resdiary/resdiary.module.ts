import { Module } from '@nestjs/common';
import { ResdiaryController } from './resdiary.controller';
import { ResdiaryService } from './resdiary.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [ResdiaryController],
  providers: [ResdiaryService],
  exports: [ResdiaryService],
})
export class ResdiaryModule {}
