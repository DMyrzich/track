import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track, TrackDocument } from './schemas/track.schema';
import { AlbumDocument, Album } from '../album/schemas/album.schema';
import { CommentDocument, Comment } from '../comment/schemas/comment.schema';
import * as mongoose from 'mongoose';
import { CreateFileDto } from 'src/file/dto/create-file.dto';
import { FileService, FileType } from '../file/file.service'; 

@Injectable()
export class TrackService {

  constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService) { }

  async create(createTrackDto: CreateTrackDto, file: CreateFileDto): Promise<Track> {
    const { audio, picture } = file;
    const audioPath = this.fileService.create(FileType.AUDIO, audio[0]);
    const picturePath = this.fileService.create(FileType.IMAGE, picture[0]);
    const { name, artist, text, } = createTrackDto;

    const duration = 0;
    const newTrack = await this.trackModel.create({ name, artist, duration, text, date: new Date(), listens: 0, picture: picturePath, audio: audioPath });
    return newTrack;
  }

  async findAll(count: number = 15, offset: number = 0): Promise<Track[]> {
    if (count > 200) {
      count = 15
    }
    return await this.trackModel.find().skip(offset).limit(count).sort({ "date": -1 }).exec();
  }

  async search(q: string): Promise<Track[]> {
    return await this.trackModel.find({ name: { $regex: new RegExp(q, 'i') } });
  }

  async findOne(id: mongoose.Schema.Types.ObjectId): Promise<Track> {

    return await this.trackModel.findById(id).populate({
      path: 'comments',
      options: { limit: 10 }
    }).exec();
  }

  async update(id: mongoose.ObjectId, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const updateTrack = await this.trackModel.findOneAndUpdate(id, updateTrackDto)
    return updateTrack;
  }

  async listen(id: mongoose.ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens++;
    track.save;
  }

  async remove(id: mongoose.ObjectId): Promise<Track> {
    return await this.trackModel.findOneAndDelete(id);
  }
}
