import { NextResponse } from 'next/server';
import { auth as middleware } from '@/server/providers/auth';

// path for middleware to work on
// export const config = {
// 	matcher: [
// 		'/sign-up',
// 		'/search(.*)'
// 	]
// };

export default middleware(req => {
	if (!req.auth && req.nextUrl.pathname.startsWith('/my-account')) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (req.auth && req.nextUrl.pathname.startsWith('/login')) {
		return NextResponse.redirect(new URL('/my-account', req.url));
	}
	if (req.auth && req.nextUrl.pathname.startsWith('/sign-up')) {
		return NextResponse.redirect(new URL('/my-account', req.url));
	}
});
