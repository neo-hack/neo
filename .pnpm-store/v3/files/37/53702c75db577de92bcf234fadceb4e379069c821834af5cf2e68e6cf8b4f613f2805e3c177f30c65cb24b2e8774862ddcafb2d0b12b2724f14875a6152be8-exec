[![npm](https://img.shields.io/npm/v/rollup-plugin-exclude-dependencies-from-bundle.svg)](https://www.npmjs.com/package/rollup-plugin-exclude-dependencies-from-bundle) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Rollup Plugin Exclude Dependencies From Bundle

Automatically externalize `dependencies` and `peerDependencies` in a bundle.

## Installation

```bash
npm install --save-dev rollup-plugin-exclude-dependencies-from-bundle
```

## Usage

```javascript
// Add to plugins in rollup.config.js
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

export default {
  plugins: [excludeDependenciesFromBundle(/*{ plugin options }*/)]
};
```

### Plugin options

- `peerDependencies`: true

      	Set to true for excluding peer dependencies from the bundled files.

- `dependencies`: true

      	Set to true for excluding dependencies from the bundled files.
