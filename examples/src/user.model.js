"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor(data) {
        this.data = data;
    }
    get fullName() {
        return this.data.name;
    }
    get email() {
        return this.data.email;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map