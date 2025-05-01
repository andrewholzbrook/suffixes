"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
describe('UserModel', () => {
    const testUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date('2024-01-01')
    };
    it('should return full name', () => {
        const model = new user_model_1.UserModel(testUser);
        expect(model.fullName).toBe('John Doe');
    });
    it('should return email', () => {
        const model = new user_model_1.UserModel(testUser);
        expect(model.email).toBe('john@example.com');
    });
});
//# sourceMappingURL=user.test.js.map