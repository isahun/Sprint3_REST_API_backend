import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  const userModelMock = { findOne: jest.fn(), findById: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: userModelMock },
      ],
    }).compile();
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByGoogleId returns the user found', async () => {
    const user = { googleId: 'g-1', email: 'a@b.com' };
    userModelMock.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(user),
    });

    await expect(service.findByGoogleId('g-1')).resolves.toEqual(user);
    expect(userModelMock.findOne).toHaveBeenCalledWith({ googleId: 'g-1' });
  });
});
