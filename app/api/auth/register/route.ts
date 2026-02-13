import { NextResponse } from 'next/server';
import { addUser, findUserByEmail } from '@/lib/user-db';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const newUser = {
            id: Math.random().toString(36).substring(2, 9),
            name,
            email,
            password, // In a real app, hash this!
        };

        addUser(newUser);

        return NextResponse.json({ success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
