import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { options } from './filter';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', options))
  upload(@UploadedFile() file: Express.Multer.File) {
    // @UploadedFile() file: Express.Multer.File
    console.log('file ----->', file);
    return '上传文件';
  }

  @Get()
  findAll() {
    return this.resourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(+id, updateResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceService.remove(+id);
  }
}
