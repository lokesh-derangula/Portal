import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/user-db';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const user = findUserByEmail(email);
        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // In a real app, you'd set a session cookie here
        return NextResponse.json({
            success: true,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
