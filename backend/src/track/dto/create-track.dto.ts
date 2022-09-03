import { MinLength } from "class-validator";

export class CreateTrackDto {

    @MinLength(5)
    name: string;

    artist?: string;

    @MinLength(5)
    text: string;

}


