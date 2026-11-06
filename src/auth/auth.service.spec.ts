import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  const usersServiceMock = {
    findByGoogleId: jest.fn(),
    createGoogleUser: jest.fn(),
    findOneWithPassword: jest.fn(),
  };
  const jwtServiceMock = {
    signAsync: jest.fn().mockResolvedValue('fake-token'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('googleLogin creates the user when the googleId is unknown', async () => {
    usersServiceMock.findByGoogleId.mockResolvedValue(null);
    usersServiceMock.createGoogleUser.mockResolvedValue({
      _id: 'id1',
      email: 'a@b.com',
    });

    const result = await service.googleLogin({
      googleId: 'g-1',
      email: 'a@b.com',
    });

    expect(usersServiceMock.createGoogleUser).toHaveBeenCalled();
    expect(result).toEqual({ access_token: 'fake-token' });
  });

  it('googleLogin reuses the user when it already exists', async () => {
    usersServiceMock.findByGoogleId.mockResolvedValue({
      _id: 'id1',
      email: 'a@b.com',
    });

    await service.googleLogin({ googleId: 'g-1', email: 'a@b.com' });

    expect(usersServiceMock.createGoogleUser).not.toHaveBeenCalled();
  });
});
