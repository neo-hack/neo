import { AsyncReturnType, CommonOptions } from '../interface'
import { debugLogger } from '../utils/logger'
import createLockFile from './lock-file'
import createTemplatePM, { RequestOptions } from './pm'

let store: AsyncReturnType<typeof createStore>

const createStore = async (params: CommonOptions) => {
  const pm = await createTemplatePM(params)
  const lockFile = createLockFile(params)
  return {
    pm,
    lockFile,
    async addTemplate(params: RequestOptions) {
      const fetchResponse = await pm.request(params)
      if (!fetchResponse) {
        debugLogger.store('template not found')
        return
      }
      const manifest = await fetchResponse?.bundledManifest?.()
      const { id, resolvedVia } = fetchResponse.body
      await lockFile.updateTemplates({
        [id]: {
          name: manifest!.name,
          version: manifest!.version,
          resolvedVia,
        },
      })
      return fetchResponse
    },
  }
}

const create = async (params: CommonOptions) => {
  if (store) {
    return store
  }
  return createStore(params)
}

export default create
