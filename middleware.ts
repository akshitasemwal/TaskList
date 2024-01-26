import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware (req: any){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});

    const { data: {user} } = await supabase.auth.getUser();

    if( user && req.nextUrl.pathname === '/')   //if logged in and at home route - login/signin page, redirect to todo page
    {
        return NextResponse.redirect(new URL('/todo', req.url));
    }

    if( !user && req.nextUrl.pathname !== '/')   //redirect to / if user is not logged in and at wrong page
    {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return res;
}

export const config = {        //applied only at these paths
    matcher: ['/', '/todo']
}