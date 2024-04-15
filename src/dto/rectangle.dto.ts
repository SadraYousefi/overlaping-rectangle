import { IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RectangleDto {
  @ApiProperty({
    name: "x" ,
    description: "your point" ,
    example: "21" ,
    type: Number
  })
  @IsNumber()
  x: number;

  @ApiProperty({
    name: "y" ,
    description: "your point" ,
    example: "32",
    type: Number
  })
  @IsNumber()
  y: number;

  @ApiProperty({
    name: "width" ,
    description: "width of rectangle" , 
    example: "80" ,
    type: Number
  })
  @IsNumber()
  width: number;


  @ApiProperty({
    name: "height" ,
    description: "height of rectangle" , 
    example: "30" ,
    type: Number
  })
  @IsNumber()
  height: number;
}

export class CreateRectangleDto {
  @ApiProperty({
    name: "main" ,
    description: "main rectangle details" ,
    example: { "x": 0, "y": 0, "width": 10, "height": 20 },
    type: [RectangleDto],
  })
  @ValidateNested({ each: true })
  @Type(() => RectangleDto)
  main: RectangleDto;

  @ApiProperty({
    name: "input" ,
    description: 'array of rectangles',
    type: [RectangleDto],
    example: [
      { "x": 2, "y": 18, "width": 5, "height": 4 },
      { "x": 12, "y": 18, "width": 5, "height": 4 },
    ] ,
    isArray: true,
    minItems: 1,
  })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RectangleDto)
  input: RectangleDto[];
}
