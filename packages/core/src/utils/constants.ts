import os from 'os'
import path from 'path'

export const STORE_PATH = path.join(os.homedir(), '.neo-store')
export const LOCK_FILE = 'neo-lock.yml'
export const NPM_REGISTRY = 'https://registry.npmjs.org/'

export const enum TEMPLATES {
  ROLLUP_STARTER = 'rollup-template',
  REACT_PC_SPA_STARTER = 'react-template',
  CHROME_EXTENSTION_STARTER = 'chrome-extenstion-template',
  BIN_TEMPLATE = 'bin-template',
  REACT_COMPONENTS_LIB_TEMPLATE = 'react-components-lib-template',
  TS_LIB_TEMPLATE = 'ts-lib-template',
  WEBPACK_LOADER_TEMPLATE = 'webpack-loader-template',
  ORIGINAL_HTML_TEMPLATE = 'original-html-template',
  NEXTJS_REMATCH2_TEMPLATE = 'nextjs-rematch2-template',
  ESLINT_CONFIG_TEMPLATE = 'eslint-config-template',
  DAYJS_PLUGIN_TEMPLATE = 'dayjs-plugin-template',
  ALFRED_WORKFLOW_TEMPLATE = 'alfred-workflow-template',
}

export const templates = {
  [TEMPLATES.ROLLUP_STARTER]: 'rollup stater build pure function lib',
  [TEMPLATES.REACT_PC_SPA_STARTER]: 'webapp starter base on react react-router rematch',
  [TEMPLATES.CHROME_EXTENSTION_STARTER]: 'chrome-extenstion starter base ts rxjs react',
  [TEMPLATES.BIN_TEMPLATE]: 'bin template',
  [TEMPLATES.REACT_COMPONENTS_LIB_TEMPLATE]:
    'react components lib starter, work fine with single component or mutiple components',
  [TEMPLATES.WEBPACK_LOADER_TEMPLATE]: 'webapck-loader starter',
  [TEMPLATES.TS_LIB_TEMPLATE]: 'typescript lib',
  [TEMPLATES.ORIGINAL_HTML_TEMPLATE]: 'original html without fe framework',
  [TEMPLATES.NEXTJS_REMATCH2_TEMPLATE]: 'nextjs and rematch2 quick start',
  [TEMPLATES.ESLINT_CONFIG_TEMPLATE]: 'eslint config template',
  [TEMPLATES.DAYJS_PLUGIN_TEMPLATE]: 'dayjs plugin template',
  [TEMPLATES.ALFRED_WORKFLOW_TEMPLATE]: 'alfred workflow',
}
