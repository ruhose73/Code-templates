import { Test, TestingModule } from '@nestjs/testing';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

describe('BaseController', () => {
  let baseController: BaseController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BaseController],
      providers: [BaseService],
    }).compile();

    baseController = app.get<BaseController>(BaseController);
  });
});
