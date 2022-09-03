import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from 'src/file/dto/create-file.dto';

@Controller('track')
export class TrackController {

  constructor(private readonly trackService: TrackService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }, { name: 'audio', maxCount: 1 }]))
  create(@UploadedFiles() file: CreateFileDto, @Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto, file);
  }

  @Get()
  findAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.findAll(count, offset);
  }

  @Get('search')
  search(@Query('q') q: string) { 
    return this.trackService.search(q);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.trackService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.trackService.remove(id);
  }

  @Get('listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }

}
