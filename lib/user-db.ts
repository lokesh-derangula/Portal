import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'users.json');

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export function getUsers(): User[] {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
}

export function saveUsers(users: User[]) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function addUser(user: User) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

export function findUserByEmail(email: string): User | undefined {
    const users = getUsers();
    return users.find(u => u.email === email);
}
