
export class CreateFileDto extends Array<Express.Multer.File> {
    audio: Express.Multer.File[]
    picture: Express.Multer.File[]
}
