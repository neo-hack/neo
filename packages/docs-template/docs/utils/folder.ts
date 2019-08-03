/**
 * Generate folders in docs
 */
import { ignoreFolders as DEFAULT_IGNORE_FOLDERS } from '../config/ignore.config'
import { rootPath as DEFAULT_ROOT_PATH } from '../config/docs.config'
import isEmpty from 'lodash/isEmpty'
import * as fs from 'fs'

const DEFAULT_SUPPORT_LEVEL = 1

interface Props {
  // exclude folders in travel
  ignoreFolders: string[]
  // folder path to travel
  folderPath: string
  // support travel folder deep
  level: Level
}

export type Folder = { [key: string]: Folders } | string
export type Folders = Folder[]
type Level = number | 'all'

class FolderGenerator {
  ignoreFolders: Props['ignoreFolders'] = DEFAULT_IGNORE_FOLDERS
  folderPath: Props['folderPath'] = DEFAULT_ROOT_PATH
  folders: Folders = []
  level: Props['level'] = DEFAULT_SUPPORT_LEVEL
  constructor(props?: Partial<Props>) {
    this.ignoreFolders = props && props.ignoreFolders ? props.ignoreFolders : DEFAULT_IGNORE_FOLDERS
    this.folderPath = props && props.folderPath ? props.folderPath : DEFAULT_ROOT_PATH
    this.level = props && props.level ? props.level : DEFAULT_SUPPORT_LEVEL
  }
  public getFolders = (currentLevel: number = 1, force: boolean = false): Folders => {
    if (!isEmpty(this.folders) && !force) {
      return this.folders
    }
    // reset folders to empty
    if (currentLevel === 1) {
      this.folders = []
    }
    const folders: Folders = []
    const _folders: string[] = fs.readdirSync(this.folderPath)
    _folders.forEach((e) => {
      const isDir = this.isDir(e)
      if (!isDir) {
        folders.push(this.getFolder(e, false))
      }
      const isVaild = isDir && !this.ignoreFolders.includes(e)
      if (isVaild) {
        const entry = this.getFolder(e, true) as { [key: string]: Folders }
        const key = Object.keys(entry)[0] // child folder path
        const _folderPath = this.folderPath
        this.folderPath = key // change travel folder path
        if (this.level !== 'all' && this.level <= currentLevel) {
          folders.push(entry)
        }
        entry[key] = this.getFolders(currentLevel + 1, true)
        this.folderPath = _folderPath // reset folderpath to original
      }
    })
    return folders
  }
  protected getFolder = (baseName: string, isDir = false): Folder => {
    const key = `${this.folderPath}/${baseName}`
    return isDir ? { [key]: [] } : key
  } 
  private isDir = (baseName: string): boolean => {
    const _value = `${this.folderPath}/${baseName}`
    return !!(_value &&　fs.lstatSync(_value).isDirectory())
  }
}

export default FolderGenerator

// pass
// const Generator = new FolderGenerator()
// const x = Generator.getFolders()[1] as { [key: string]: Folders }
// const y = x['/home/eric/Documents/WebstormProjects/templates/docs/examples'][1] as { [key: string]: Folders }
// console.log(y['/home/eric/Documents/WebstormProjects/templates/docs/examples/a'][0])
