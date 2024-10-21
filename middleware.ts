// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const { pathname } = request.nextUrl;

    // Protect all routes except public routes like /sign-in
    if (pathname === '/sign-in' || pathname === '/sign-up') {
        return NextResponse.next();
    }

    const token = request.cookies.get('authToken'); // Assume token stored in cookie

    // Redirect to sign-in if not authenticated
    if (!token) {
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: ['/((?!_next/static|favicon.ico).*)'], // Exclude static files
};
