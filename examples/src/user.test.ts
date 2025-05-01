import { UserModel, User } from './user.model';

describe('UserModel', () => {
  const testUser: User = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date('2024-01-01'),
  };

  it('should return full name', () => {
    const model = new UserModel(testUser);
    expect(model.fullName).toBe('John Doe');
  });

  it('should return email', () => {
    const model = new UserModel(testUser);
    expect(model.email).toBe('john@example.com');
  });
});
