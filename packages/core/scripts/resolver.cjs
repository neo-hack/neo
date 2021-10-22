// const enhancedResolve = require("enhanced-resolve");

// const resolver = enhancedResolve.create.sync({
//   extensions: [".js", ".jsx", ".ts", ".tsx"],
//   mainFields: ["exports", "import", "require", "module", "main"],
//   conditionNames: ["import", "node", "require"],
// });

// module.exports = function (request, options) {
//   return resolver(options.basedir, request).replace(/\0#/g, "#");
// };

module.exports = (request, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(request, {
    ...options,
    conditions: ['import', 'default'],
    // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
    packageFilter: pkg => {
      if (pkg.name === 'comparedir-test') {
        console.log(options)
      }
      return {
        ...pkg,
        // Alter the value of `main` before resolving the package
        main: pkg.main || pkg.module,
      };
    },
  });
};