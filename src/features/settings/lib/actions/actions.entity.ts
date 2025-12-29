import type { ActionsSchema } from '@settings/lib/actions/types'
import type z from 'zod'

export type Actions = z.infer<typeof ActionsSchema>
