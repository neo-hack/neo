import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'example',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'xxx',
        style: 'css',
      },
    ],
  ],
  chainWebpack(config) {
    config.node.set('module', 'empty');
    config.module.rule('exclude').exclude.add(/\.styl/);
    const use = (config.module.rules.get('less') as any).toConfig().use;
    const _use = use.slice(0, use.length - 1);
    config.resolve.extensions.add('.styl');
    const rule = config.module.rule('stylus').test(/\.styl$/);
    for (let i = 0; i < _use.length; i++) {
      rule
        .use(i.toString())
        .loader(_use[i].loader)
        .options(_use[i].options);
    }
    rule
      .use('stylus-loader')
      .loader(require.resolve('stylus-loader'))
      .options({
        preferPathResolver: 'webpack',
      })
      .end();
  },
};

export default config;
