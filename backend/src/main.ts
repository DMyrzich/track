import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'; 
import { TrackModule } from './track/track.module';

async function app() {
  const app = await NestFactory.create(TrackModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 5000) 
}
app();
