import { AsyncReturnType, CommonOptions } from '../interface'
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
      const manifest = await fetchResponse?.bundledManifest?.()
      if (!manifest) {
        return
      }
      await lockFile.updateTemplates({
        [lockFile.getTemplateId(manifest!.name, manifest!.version)]: {
          name: manifest!.name,
          version: manifest!.version,
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
