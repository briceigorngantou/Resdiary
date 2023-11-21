import { Test, TestingModule } from '@nestjs/testing';
import { ResdiaryController } from './resdiary.controller';

describe('ResdiaryController', () => {
  let controller: ResdiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResdiaryController],
    }).compile();

    controller = module.get<ResdiaryController>(ResdiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
