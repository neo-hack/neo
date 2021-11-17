import path from 'path'
import execa from 'execa'
import download from 'download'

const npm = {
  async download(name: string) {
    const { stdout } = await execa('npm', ['v', name, 'dist.tarball'])
    await download(stdout, path.join(process.cwd(), '.neo'), {
      extract: true,
    })
  },
}

export const dl = {
  npm,
}
