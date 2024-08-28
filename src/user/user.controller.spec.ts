/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userService.create', async () => {
      const createUserDto = { name: 'John Doe', job: 'Developer' };
      await controller.createUser(createUserDto);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('getUser', () => {
    it('should call userService.findOne', async () => {
      const userId = '1';
      await controller.getUser(userId);
      expect(service.findOne).toHaveBeenCalledWith(userId);
    });
  });
});