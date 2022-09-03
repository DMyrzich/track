import { Length, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCommentDto {

    @Length(3, 20)
    username: string;
  
    @MinLength(5)
    text: number; 

    @MinLength(5)
    trackId: ObjectId; 

}
