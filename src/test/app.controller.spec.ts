import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('checkOverlap', () => {
    it('should call appService.checkOverlap with the provided createRectangleDto', async () => {
      const createRectangleDto = { main: { x: 0, y: 0, width: 10, height: 20 }, input: [{ x: 2, y: 18, width: 5, height: 4 }] };
      const expectedResult = createRectangleDto;
      
      jest.spyOn(appService, 'checkOverlap').mockResolvedValue(expectedResult);
      
      const result = await appController.checkOverlap(createRectangleDto);
      
      expect(result).toEqual(expectedResult);
    });
  });

  describe('listOfRectangles', () => {
    it('should call appService.listOfRectangles', async () => {
      const expectedResult = [];
      
      jest.spyOn(appService, 'listOfRectangles').mockResolvedValue(expectedResult);
      
      const result = await appController.listOfRectangles();
      
      expect(result).toEqual(expectedResult);
    });
  });
});
