import PocketBase from 'pocketbase'

const POCKETBASE_URL = import.meta.env.POCKETBASE_URL || process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'

let pbInstance: PocketBase | null = null

export function getPocketBase(): PocketBase {
  if (!pbInstance) {
    pbInstance = new PocketBase(POCKETBASE_URL)
    // Auto-refresh auth token
    pbInstance.autoCancellation(false)
  }
  return pbInstance
}

export const pb = getPocketBase()