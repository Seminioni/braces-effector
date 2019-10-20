import Vue from "vue";
import {
  RouteConfig, Route, RawLocation, NavigationGuard,
} from "vue-router";
import { Store } from "effector";

declare module "vue-router" {
  interface R extends RouteConfig {
    meta?: {
      beforeResolve?: (
        to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
      ) => void
    } & { [key: string]: any }
    children?: R[];
  }
}


declare global {
  type State<T> = T extends Store<infer State> ? State : never;

  interface Window {
    mobilecheck: () => boolean
    opera: string;
  }
}
