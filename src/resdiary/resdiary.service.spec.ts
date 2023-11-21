import { Test, TestingModule } from '@nestjs/testing';
import { ResdiaryService } from './resdiary.service';

describe('ResdiaryService', () => {
  let service: ResdiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResdiaryService],
    }).compile();

    service = module.get<ResdiaryService>(ResdiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
