"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComponent = void 0;
const react_1 = __importDefault(require("react"));
const UserComponent = ({ user, onUpdate }) => {
    return (<div className="user-card">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <span>Member since: {user.createdAt.toLocaleDateString()}</span>
        </div>);
};
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map