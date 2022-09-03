import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Album, AlbumSchema } from 'src/album/schemas/album.schema';
import { CommentSchema, Comment } from 'src/comment/schemas/comment.schema';
import { Track, TrackSchema } from './schemas/track.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommentModule } from '../comment/comment.module';
import { AlbumModule } from '../album/album.module';
import { FileModule } from "src/file/file.module";
import { FileService } from '../file/file.service';
import * as path from 'path'; 

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, '..', 'static') }),
    MongooseModule.forRoot('mongodb+srv://dimasik1996:dimasik1996@cluster0.splinqu.mongodb.net/TOP-MUISC?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }, { name: Album.name, schema: AlbumSchema }, { name: Track.name, schema: TrackSchema }]),
    TrackModule, CommentModule, AlbumModule, FileModule
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService]

})
export class TrackModule { }