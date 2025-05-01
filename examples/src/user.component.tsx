import React from 'react';
import { User } from './user.model';

interface UserComponentProps {
    user: User;
    onUpdate: (user: User) => void;
}

export const UserComponent: React.FC<UserComponentProps> = ({ user, onUpdate }) => {
    return (
        <div className="user-card">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <span>Member since: {user.createdAt.toLocaleDateString()}</span>
        </div>
    );
};
