/**
 * Authorization maps for public routes, IU-only routes and CU-only routes
 * A route must be registered here for it to pass through the proxy
 */
const authorizedRoutes = {
  public: ['/api/health'],
  internalUsers: ['/'],
  clientUsers: ['/client'],
}

export default authorizedRoutes
