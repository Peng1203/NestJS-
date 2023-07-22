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
  UploadedFiles,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Express, Response } from 'express';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { options } from './filter';
import { multerOptions } from '@/utils/mluter.options';
import path from 'path';
import { ROOT_PATH } from '@/config/resource.config';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  // 上传单个文件
  @Post('upload')
  // @UseInterceptors(FileInterceptor('file', options))
  @UseInterceptors(FileInterceptor('file', multerOptions(2, 1, 'disk', 'img')))
  upload(@UploadedFile() file: Express.Multer.File) {
    // @UploadedFile() file: Express.Multer.File
    console.log('file ----->', file);
    return '上传文件';
  }

  // 上传文件数组
  // FilesInterceptor 函数 限制上传文件数量 需要和 multerOptions参数一致
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 3, multerOptions(2, 3)))
  uploads(@UploadedFiles() files: Array<Express.Multer.File>) {
    // console.log('files ----->', files);
    return '文件数组--批量上传文件';
  }

  // 上传多个不同名称的文件
  @Post('upload/files')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 3 },
        { name: 'file2', maxCount: 1 },
      ],
      // 封装的 配置项 设置的上传最大数要 大于等于 FileFieldsInterceptor 的每一项 maxCount 的总和
      multerOptions(2, 4),
    ),
  )
  uploadFiles(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
  ) {
    console.log('file1 ----->', files.file1);
    console.log('file2 ----->', files.file2);
    return '上传多个文件';
  }

  // 接收任意名称的上传字段信息
  @Post('upload/any')
  @UseInterceptors(AnyFilesInterceptor(multerOptions(2, 4)))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);

    return '任意上传的触发!!!';
  }

  // 上传大文件
  @Post('upload/large')
  @UseInterceptors(
    FileInterceptor('file', multerOptions(250, 1, 'disk', 'custom')),
  )
  uploadLarge(@UploadedFile() file: Express.Multer.File) {
    console.log('file ----->', file);
    if (!file) throw new BadRequestException('请选择上传文件');

    return '上传大文件';
  }

  @Get('/download/:fileName')
  downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    console.log('fileName ----->', fileName);
    const filePath = path.join(ROOT_PATH, fileName);
    console.log('filePath ----->', filePath);
    // return `下载文件${filePath}`;
    res.download(filePath);
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
