import fs, { PathLike } from 'fs'
import path from 'path'
import Router from '../utils/router'

const DEFAULT_TEM_PATH = path.join(__dirname, 'template.md')

interface Props {
  templatePath: PathLike
}

interface MenusSchema {
  url: string
  text: string
}

class Menus {
  templatePath: Props['templatePath'] = DEFAULT_TEM_PATH
  constructor(props?: Partial<Props>) {
    this.templatePath = props && props.templatePath ? props.templatePath : DEFAULT_TEM_PATH
  }
  private loadTemplate = (path: Props['templatePath'] = this.templatePath) => {
    return fs.readFileSync(path).toString()
  }
  writeGuideReadme = (fileName = 'README.md') => {
    const menus = this.createMenus()
    const template = this.loadTemplate()
    const data = template + '\n' + menus
    fs.writeFileSync(`${__dirname}/${fileName}`, data)
  }
  createMenus = () => {
    const menus: MenusSchema[] = Object.keys(Router.routes)
      .map(k => {
        return {
          url: k,
          text: k.replace(/\//g, ''),
        }
      })
    const lis = menus.map(e => {
      return this.createLink(e.url, e.text)
    })
    return this.createUL(lis)
  }
  createUL = (
    lis: string[]
  ) => {
    return lis.map(e => {
      return this.createLI(e)
    }).join('\n')
  }
  createLink = (url: string, text: string) => {
    return `[${text}](${url})`
  }
  createLI = (value: string) => {
    return `* ${value}`
  }
}

const menu = new Menus()
menu.writeGuideReadme()
