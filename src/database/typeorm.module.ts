import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: "postgres" ,
                url: configService.getOrThrow("DB_URI"),
                autoLoadEntities: true ,
                synchronize: configService.getOrThrow("SYNCHRONIZE_MODE")
            }) ,
            inject: [ConfigService] ,
        }) ,
    ] ,
})
export class Typeorm {
    constructor(private dateSource: DataSource){}
}