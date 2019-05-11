import LazyLoad from "@/components/LazyLoad";

export interface RoutesConfigSchema {
  path: string;
  redirect?: string;
  component?: any;
  children?: RoutesConfigSchema[];
}

export const routesConfig: RoutesConfigSchema[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: (props: any) => LazyLoad(props, () => import("@/pages/Home")),
    children: [
      {
        path: "/home/in",
        component: (props: any) =>
          LazyLoad(props, () => import("@/pages/Home/In"))
      }
    ]
  }
];
