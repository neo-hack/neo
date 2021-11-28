# cmd-preset

## what's preset

preset is a list of template repos, preset could be preset `npm-package` and `remote-git-repo`

behaviour

- load preset
  - preset package
  - preset git repo

will parse preset `name` and `repos` into `home/.neo-store/neo-lock.yaml`

### how to add preset

- `neo preset add preset*` download npm-package, and add npm-package preset
- `neo preset add filepath.json` add preset json file 
- `neo preset add git-repo-path` download git-repo and add git-package preset

## lock yaml format

- presets
  - preset-name
    - package-name
- packages
  - package-name#version
    - version
    - changelog
    - readme

## TODO

### how to manage template repo version

if input repo name like `neo create`, maybe in default no version selection

1. list and search template repo name
2. if `neo create -i` after select template repo name, then select repo version?

diff repo in `neo-store`

store has all version template repo?

### how to add preset and template repo

option-1: use pnpm to download and write lock-file
option-2: use download function download git-repo and npm-package