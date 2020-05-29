import { BASE } from '../constants/project.constants'
import { extname, basename } from 'path'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import isEmpty from 'lodash/isEmpty'
import FolderGenerator, { Folder } from './folder'

export const createRouterUrl = (url: string) => {
  return `${BASE}${url}/`
}

type Routes = { [key: string]: string[] }

class RouterGenerator extends FolderGenerator {
  routes: Routes = {}
  /**
   * just remove abs folder path
   */
  private abs2rel = (path: string, absPath: string = this.folderPath): string => {
    return path.replace(absPath, '')
  }
  protected hasChildRoutes = (routes: any): boolean => {
    return isObject(routes)
  }
  protected isRoute = (fileName: string): boolean => {
    return extname(fileName).toLowerCase() === '.md'
  }
  protected isIndexRoute = (fileName: string): boolean => {
    return this.isRoute(fileName) && basename(fileName).toLowerCase() === 'readme.md'
  }
  protected getNormalRoute = (route: string) => {
    return route.replace(/\/([\S\s\/]+)\.md/gi, (_, p1) => {
      return p1
    })
  }
  protected getIndexRoute = (route: string) => {
    return route.replace(/([\S\s]*)\/readme\.md/i, (match, p1: string) => {
      const _p1 = p1.startsWith('/') ? p1.slice(1) : p1
      return p1 ? _p1 : ''
    })
  }
  protected getChildRoutes = (folder: Folder, absPath: string): string[] => {
    let childRoutes: string[] = []
    let relPath = ''
    if (isString(folder)) {
      relPath = this.abs2rel(folder, absPath)
      if (this.isIndexRoute(relPath)) {
        childRoutes.push(this.getIndexRoute(relPath))
      } else if (this.isRoute(relPath)) {
        childRoutes.push(this.getNormalRoute(relPath))
      }
    } else {
      const key = Object.keys(folder)[0]
      const values = folder[key]
      values.forEach((v) => {
        childRoutes = childRoutes.concat(this.getChildRoutes(v, absPath))
      })
    }
    return childRoutes.sort()
  }
  getRoutes = (force: boolean = false): Routes => {
    if (!isEmpty(this.routes) && !force) {
      return this.routes
    }
    const folders = this.getFolders()
    const routes: Routes = {}
    folders.forEach((f) => {
      const hasChildRoutes = this.hasChildRoutes(f)
      if (!hasChildRoutes) {
        // do nothing
      } else {
        const key = Object.keys(f)[0]
        const firstLevelRoute = createRouterUrl(this.abs2rel(key, this.folderPath + '/'))
        const childrenRoutes = this.getChildRoutes(f, key)
        if (!isEmpty(childrenRoutes)) {
          routes[firstLevelRoute] = childrenRoutes
        }
      }
    })
    this.routes = routes
    return routes
  }
}

const Generator = new RouterGenerator()
Generator.getRoutes()
export default Generator
