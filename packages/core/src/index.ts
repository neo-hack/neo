const REPO_NAME = 'templates'
const REPO_AUTHOR = 'JiangWeixian'
const PACKAGES_FOLDER = 'packages'

const templates = [
  'rollup-templates',
  'react-templates',
  'docs-templates',
  'chrome-extenstion-template',
]

// refs https://stackoverflow.com/a/44109535/11868008
const donwload = ({ template }: { template: string }) => {
  return `curl https://codeload.github.com/${REPO_AUTHOR}/${REPO_NAME}/tar.gz/master | \
  tar -xz --strip=2 ${REPO_NAME}-master/${PACKAGES_FOLDER}/${template}`
}
