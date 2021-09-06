import getExternal from "./get-external";

interface ExcludeDependenciesFromBundlePlugin {
  peerDependencies?: boolean;
  dependencies?: boolean;
}

type Plugin = {
  name: string;
  options: (opts: { external: string[] }) => Record<string, unknown>;
};

export default function ({
  peerDependencies,
  dependencies,
}: ExcludeDependenciesFromBundlePlugin = {}): Plugin {
  return {
    name: "exclude-dependencies-from-bundle",
    options: (opts) => ({
      ...opts,
      external: getExternal(opts.external, peerDependencies, dependencies),
    }),
  };
}
