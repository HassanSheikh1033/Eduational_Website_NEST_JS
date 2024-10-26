import { Module } from '@nestjs/common';
import { FileuploadsService } from './fileuploads.service';
import { FileuploadsController } from './fileuploads.controller';

@Module({
  controllers: [FileuploadsController],
  providers: [FileuploadsService],
})
export class FileuploadsModule {}
