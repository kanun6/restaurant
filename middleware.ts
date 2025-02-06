import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(['/add_food(.*)', '/add_table(.*)'])

const isProtectedRoute = createRouteMatcher([
    '/favorite(.*)', '/add_food(.*)' ,'/add_table(.*)'
])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()

      // if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'marketing_admin') {
      //   const url = new URL('/', req.url)
      //   return NextResponse.redirect(url)
      // }
  })

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};