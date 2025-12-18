// Authorization maps for public routes, IU-only routes and CU-only routes
const authorizedRoutes = {
  public: ['/api/health'],
  internalUsers: ['/'],
  clientUsers: ['/client'],
}

export default authorizedRoutes
