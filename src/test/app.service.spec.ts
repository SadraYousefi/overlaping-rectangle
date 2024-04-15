import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Rectangle } from "../entities/rectangle.entity";
import { AppService } from "../services/app.service";
import { Repository } from "typeorm";

describe('AppService', () => {
    let appService: AppService;
    let rectangleRepository: Repository<Rectangle>;
  
    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [
          AppService,
          { provide: getRepositoryToken(Rectangle), useClass: Repository },
        ],
      }).compile();
  
      appService = moduleRef.get<AppService>(AppService);
      rectangleRepository = moduleRef.get<Repository<Rectangle>>(getRepositoryToken(Rectangle));
    });
  
    describe('checkOverlap', () => {
      it('should call createRectangle for each overlapping rectangle', async () => {
        const createRectangleDto = { main: { x: 0, y: 0, width: 10, height: 20 }, input: [{ x: 2, y: 18, width: 5, height: 4 }] };
        const rectangleToCreate = createRectangleDto.input[0];
        
        jest.spyOn(appService, 'hasOverlap').mockReturnValue(true);
        jest.spyOn(appService, 'createRectangle').mockResolvedValueOnce(null);
        
        await appService.checkOverlap(createRectangleDto);
        
        expect(appService.hasOverlap).toHaveBeenCalledWith(createRectangleDto.main, rectangleToCreate);
        expect(appService.createRectangle).toHaveBeenCalledWith(rectangleToCreate);
      });
  
      it('should not call createRectangle for non-overlapping rectangles', async () => {
        const createRectangleDto = { main: { x: 0, y: 0, width: 10, height: 20 }, input: [{ x: 12, y: 25, width: 5, height: 4 }] };
        
        jest.spyOn(appService, 'hasOverlap').mockReturnValue(false);
        jest.spyOn(appService, 'createRectangle');
        
        await appService.checkOverlap(createRectangleDto);
        
        expect(appService.hasOverlap).toHaveBeenCalled();
        expect(appService.createRectangle).not.toHaveBeenCalled();
      });
    });
  
    describe('createRectangle', () => {
      it('should create a new rectangle entity and save it to the repository', async () => {
        const rectangleDto = { x: 2, y: 18, width: 5, height: 4 };
        const expectedEntity = new Rectangle(rectangleDto);
        
        jest.spyOn(rectangleRepository, 'save').mockResolvedValueOnce(expectedEntity);
        
        const result = await appService.createRectangle(rectangleDto);
        
        expect(result).toEqual(expectedEntity);
        expect(rectangleRepository.save).toHaveBeenCalledWith(expectedEntity);
      });
    });
  
    describe('listOfRectangles', () => {
      it('should return a list of rectangles from the repository', async () => {
        const expectedRectangles = [];
        
        jest.spyOn(rectangleRepository, 'find').mockResolvedValueOnce(expectedRectangles);
        
        const result = await appService.listOfRectangles();
        
        expect(result).toEqual(expectedRectangles);
        expect(rectangleRepository.find).toHaveBeenCalled();
      });
    });
  });
  