import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument, Comment } from '../comment/schemas/comment.schema';
import { Track, TrackDocument } from 'src/track/schemas/track.schema';
import { Album } from '../album/schemas/album.schema';


@Injectable()
export class CommentService {

  constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {

    const { text, username, trackId } = createCommentDto;
    const track = await this.trackModel.findById(trackId);
    if (!track) {
      throw new NotFoundException(`Трек с указанным id ${trackId} не найден`)
    }
    const newComment = await this.commentModel.create({ text, username, date: new Date() });

    track.comments.push(newComment);

    await track.save();
    return newComment;
  }

  findAll() {
    return `This action returns all comment`;
  }

  async findOne(count: number, offset: number, id: string) {

    if (count > 10) {
      count = 10
    }

    return await this.trackModel.findById(id).populate({
      path: 'comments',
      options: { limit: 10, skip: offset }
    }).exec();
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
