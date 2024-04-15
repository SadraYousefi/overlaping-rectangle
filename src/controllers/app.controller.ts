import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRectangleDto } from '../dto/rectangle.dto';
import { AppService } from '../services/app.service';

@ApiTags("Rectangle")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary: "tested" , description: "This route checks if the rectangles overlap with each other and saves them if they do."})
  @ApiResponse({status: 201 , description: "created successfully" })
  @Post('')
  async checkOverlap(@Body() createRectangleDto: CreateRectangleDto) {
    return await this.appService.checkOverlap(createRectangleDto) ;
  }


  @ApiOperation({summary: "tested" , description: "This route returns list of rectangles which had overlap"})
  @ApiResponse({status: 200 , description: "list of rectangles"})
  @Get('')
  async listOfRectangles() {
    return await this.appService.listOfRectangles();
  }
}
