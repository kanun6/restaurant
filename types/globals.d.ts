export {}

// Create a type for the roles
export type Roles = 'marketing_admin' | 'User'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}