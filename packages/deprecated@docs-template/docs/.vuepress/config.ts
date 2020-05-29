import Router from '../utils/router'
import { REPO_NAME } from '../constants/project.constants'

module.exports = {
  title: 'JS-Tips',
  base: REPO_NAME ? `/${REPO_NAME}/` : undefined,
  description: 'Please input Description',
  head: [['link', { rel: 'icon', href: '/favicon.png', type: 'image/x-icon' }]],
  themeConfig: {
    nav: [
      { text: 'HomePage', link: '/' },
      { text: 'Guide', link: '/Guide/' },
      { text: 'Menus', link: '/Menus/' },
      { text: 'Github', link: 'Please input repo link' },
    ],
    sidebar: {
      ...Router.routes,
    },
    lastUpdated: true,
    serviceWorker: {
      updatePopup: {
        message: '发现更新🎉',
        button: '刷新',
      },
    },
  },
  markdown: {
    config: (md: any) => {
      md.use(require('markdown-it-task-checkbox'))
    },
  },
}
