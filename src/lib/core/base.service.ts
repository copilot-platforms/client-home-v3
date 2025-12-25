import type AssemblyClient from '@assembly/assembly-client'
import type { User } from '@auth/lib/user.entity'

abstract class BaseService {
  constructor(
    protected readonly user: User,
    protected readonly assembly: AssemblyClient,
  ) {}
}

export default BaseService
