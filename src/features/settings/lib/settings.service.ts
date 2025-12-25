import type AssemblyClient from '@assembly/assembly-client'
import type { User } from '@auth/lib/user.entity'
import { defaultContent } from '@settings/lib/constants'
import type SettingsRepository from '@settings/lib/settings.repository'
import BaseService from '@/lib/core/base.service'

export default class SettingsService extends BaseService {
  constructor(
    protected readonly user: User,
    protected readonly assembly: AssemblyClient,
    protected readonly repository: SettingsRepository,
  ) {
    super(user, assembly)
  }

  getForWorkspace() {
    return this.repository.getOrCreate(this.user.workspaceId, {
      content: defaultContent,
      // We can add default banner img here later
      // bannerImageId: null,
    })
  }
}
