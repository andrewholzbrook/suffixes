"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor() {
        this.users = [];
    }
    async getUser(id) {
        return this.users.find(user => user.id === id);
    }
    async createUser(userData) {
        const user = {
            id: Math.random().toString(36).substr(2, 9),
            ...userData,
            createdAt: new Date()
        };
        this.users.push(user);
        return user;
    }
    async updateUser(id, userData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return undefined;
        this.users[index] = {
            ...this.users[index],
            ...userData
        };
        return this.users[index];
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map