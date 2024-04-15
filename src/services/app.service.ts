import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRectangleDto, RectangleDto } from '../dto/rectangle.dto';
import { Rectangle } from '../entities/rectangle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Rectangle) private readonly rectangleRepository: Repository<Rectangle>
  ) {}


  async checkOverlap(createRectangleDto: CreateRectangleDto) {
    for(let rectangle of createRectangleDto.input) {
      if(this.hasOverlap(createRectangleDto.main , rectangle)) {
        await this.createRectangle(rectangle)
      }
    }
    return createRectangleDto ;
  }
  
  hasOverlap(mainRectangle: RectangleDto , compareRectangle: RectangleDto): boolean {

    const xOverlap = (mainRectangle.x + mainRectangle.width >= compareRectangle.x) && (compareRectangle.x + compareRectangle.width >= mainRectangle.x) ;
    const yOverlap = (mainRectangle.y + mainRectangle.height >= compareRectangle.y) && (compareRectangle.y + compareRectangle.height >= mainRectangle.y) ;

    return xOverlap && yOverlap ;
    
  }

  async createRectangle (rectangle: RectangleDto): Promise<Rectangle> {

    const newRectangle = new Rectangle({...rectangle}) ;

    await this.rectangleRepository.save(newRectangle) ;
    
    return newRectangle ;

  }


  async listOfRectangles(): Promise<Rectangle[]> {
    return await this.rectangleRepository.find() ;
  }


}
