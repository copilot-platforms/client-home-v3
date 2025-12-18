import { AssemblyNoTokenError } from '@assembly/errors'
import ClientUser from '@assembly/models/client-user.model'
import InternalUser from '@assembly/models/internal-user.model'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import authorizedRoutes from '@/lib/auth/authorized-routes'
import { getSanitizedHeaders } from '@/lib/auth/utils'
import { withErrorHandler } from '@/lib/with-error-handler'
import { NotFoundError } from './errors/not-found.error'

/**
 * Application proxy that handles authentication and authorization for internal and client users
 */
export const proxy = withErrorHandler(async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname

  // Handle public routes
  if (authorizedRoutes.public.includes(pathname)) {
    return NextResponse.next()
  }

  const isInternal = authorizedRoutes.internalUsers.includes(pathname)
  const isClient = authorizedRoutes.clientUsers.includes(pathname)

  // If the route isn't one we protect, don't block it here.
  // Let Next handle it (including returning 404 for non-existent routes).
  if (!isInternal && !isClient) {
    throw new NotFoundError()
  }

  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    throw new AssemblyNoTokenError()
  }

  const headers = getSanitizedHeaders(req)

  // Handle IU routes
  if (isInternal) {
    const internalUser = await InternalUser.authenticate(token)
    return NextResponse.next({
      headers: {
        ...headers,
        'x-internal-user-id': internalUser.internalUserId,
        'x-workspace-id': internalUser.workspaceId,
      },
    })
  }

  // Handle CU routes
  else {
    const client = await ClientUser.authenticate(token)
    return NextResponse.next({
      headers: {
        ...headers,
        'x-client-id': client.clientId,
        'x-company-id': client.companyId,
        'x-workspace-id': client.workspaceId,
      },
    })
  }
})

export const config = {
  // Run middleware on all routes except Next internals and static files
  matcher: '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
}
