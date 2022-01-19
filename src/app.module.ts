import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripModule } from './trip/trip.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TripModule, MongooseModule.forRoot('mongodb+srv://root:tRwgn8LX@cluster0.n1ks3.mongodb.net/trip?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
