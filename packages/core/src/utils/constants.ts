export const SCOPE = 'aiou'

export const enum TEMPLATES {
  ROLLUP_STARTER = 'rollup-template',
  REACT_PC_SPA_STARTER = 'react-template',
  BLOG_STARTER = 'docs-templates',
  CHROME_EXTENSTION_STARTER = 'chrome-extenstion-template',
  BIN_TEMPLATE = 'bin-template',
  REACT_COMPONENTS_LIB_TEMPLATE = 'react-components-lib-template',
}

export const templates = {
  [TEMPLATES.ROLLUP_STARTER]: 'rollup stater build pure function lib',
  [TEMPLATES.REACT_PC_SPA_STARTER]: 'webapp starter base on react react-router rematch',
  [TEMPLATES.BLOG_STARTER]: 'blog stater base on vuepress',
  [TEMPLATES.CHROME_EXTENSTION_STARTER]: 'chrome-extenstion starter base ts rxjs react',
  [TEMPLATES.BIN_TEMPLATE]: 'bin template',
  [TEMPLATES.REACT_COMPONENTS_LIB_TEMPLATE]:
    'react components lib starter, work fine with single component or mutiple components',
}
