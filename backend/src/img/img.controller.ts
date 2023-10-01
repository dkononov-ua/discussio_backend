import { Controller, Post, Response, Body, Get, UseInterceptors, UploadedFile, Res, Param  } from '@nestjs/common';
import { ImgService } from './img.service';
import path from 'path';
import fs from "fs"

import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as dStorage from 'multer'
import { extname } from 'path';


@Controller('img')
export class ImgController {
constructor(private readonly ImgServicee: ImgService) {}

  @Post('uploadflat')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file : any, @Body() inf: Object, @Response() res) {

    await this.ImgServicee.saveImgF(file, inf, res)
  }

  @Post('uploadFilling')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFilling(@UploadedFile() file : any, @Body() inf: Object, @Response() res) {

    await this.ImgServicee.saveImgFilling(file, inf, res)
  }


  @Post('up')
  @UseInterceptors(FileInterceptor('file'  , {limits:{
    fileSize: 1000000, // 1 МБ
  }}))
  async up(@UploadedFile() file : any, @Body() inf: Object, @Response() res) {

    await this.ImgServicee.sa(file, inf, res)
  }

  @Post('uploaduser')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUser(@UploadedFile() file : any, @Body() inf: Object, @Response() res) {

    await this.ImgServicee.saveImgU(file, inf, res)
  }

  @Get('flat/:imgpath')
  async getflatimg( @Param('imgpath') img, @Res() res): Promise<any> {
    return res.sendFile("flat/" + img, {root: 'Static'});
  }

  @Get('users/:imgpath')
  async getuserimg( @Param('imgpath') img, @Res() res): Promise<any> {
    return res.sendFile("users/" + img, {root: 'Static'});
  }

  @Get('filling/:imgpath')
  async getFillingimg( @Param('imgpath') img, @Res() res): Promise<any> {
    return res.sendFile("filling/" + img, {root: 'Static'});
  }

}
