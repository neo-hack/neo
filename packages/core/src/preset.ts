import { dl } from './utils/dl'

export const preset = async (id: string) => {
  // download
  await dl.npm.download(id)
  // extract
  // convert to yaml format
  // save to local path
}
