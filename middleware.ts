/**
 * Authentication middleware
 * Protects routes and redirects unauthenticated users
 */

import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can be added here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect /app and /upload routes
        if (req.nextUrl.pathname.startsWith('/app') || 
            req.nextUrl.pathname.startsWith('/upload')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/app/:path*',
    '/upload/:path*',
  ]
};
