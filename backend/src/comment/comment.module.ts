import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from 'src/track/schemas/track.schema';
import { CommentSchema, Comment } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }, { name: Track.name, schema: TrackSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
