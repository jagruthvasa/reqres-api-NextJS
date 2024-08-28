/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';

describe('AvatarController', () => {
  let controller: AvatarController;
  let service: AvatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvatarController],
      providers: [
        {
          provide: AvatarService,
          useValue: {
            getAvatar: jest.fn(),
            deleteAvatar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AvatarController>(AvatarController);
    service = module.get<AvatarService>(AvatarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAvatar', () => {
    it('should call avatarService.getAvatar', async () => {
      const userId = '1';
      await controller.getAvatar(userId);
      expect(service.getAvatar).toHaveBeenCalledWith(userId);
    });
  });

  describe('deleteAvatar', () => {
    it('should call avatarService.deleteAvatar', async () => {
      const userId = '1';
      await controller.deleteAvatar(userId);
      expect(service.deleteAvatar).toHaveBeenCalledWith(userId);
    });
  });
});