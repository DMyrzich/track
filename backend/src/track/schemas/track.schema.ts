import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Album } from '../../album/schemas/album.schema';
import { Comment } from '../../comment/schemas/comment.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    date: Date;

    @Prop()
    duration: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
    albums: Album[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);