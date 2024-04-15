import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Typeorm } from './database/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rectangle } from './entities/rectangle.entity';

@Module({
  imports: [
    Typeorm ,
    TypeOrmModule.forFeature([Rectangle]) ,
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [
    TypeOrmModule.forFeature([Rectangle]) , 
    AppService
  ]
})
export class AppModule {}
