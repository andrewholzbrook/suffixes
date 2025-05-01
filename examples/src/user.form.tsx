import React, { useState } from 'react';
import { User } from './user.model';

interface UserFormProps {
    initialUser?: User;
    onSubmit: (user: User) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ initialUser, onSubmit }) => {
    const [name, setName] = useState(initialUser?.name ?? '');
    const [email, setEmail] = useState(initialUser?.email ?? '');

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
                id: initialUser?.id ?? '',
                name,
                email,
                createdAt: initialUser?.createdAt ?? new Date()
            });
        }}>
            <div>
                <label>Name:</label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};
