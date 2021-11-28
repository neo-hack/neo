import path from 'path'
import execa from 'execa'
import download from 'download'

const npm = {
  async download(name: string) {
    const { stdout } = await execa('npm', ['v', name, 'dist.tarball'])
    const dest = path.join(process.cwd(), '.neo')
    await download(stdout, dest, {
      extract: true,
    })
    return dest
  },
}

export const dl = {
  npm,
}
