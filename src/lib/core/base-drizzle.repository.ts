import type { DB } from '@/db'
import db from '@/db'

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0]

abstract class BaseDrizzleRepository {
  constructor(protected db: DB) {}

  setTx(tx: Tx) {
    this.db = tx as unknown as DB
  }
  unsetTx() {
    this.db = db
  }
}

export default BaseDrizzleRepository
