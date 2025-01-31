import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the protected route
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Protect the /dashboard route
  if (isProtectedRoute(req)) {
    await auth.protect(); // Redirect unauthenticated users to the sign-in page
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
