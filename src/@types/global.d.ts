import Vue from "vue";
import {
  RouteConfig, Route, RawLocation, NavigationGuard,
} from "vue-router";
import { Store } from "effector";
import {
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps,
  FunctionalComponentOptions,
  RecordPropsDefinition,
  ComponentOptions,
} from "vue/types/options";
import { ExtendedVue } from "vue/types/vue";

declare module "vue/types/vue" {
  interface VueConstructor<V extends Vue> {
    extend<S, Data, Methods, Computed, PropNames extends string = never>(
      options?: ThisTypedComponentOptionsWithArrayProps<S & V, Data, Methods, Computed, PropNames>
    ): ExtendedVue<V, Data, Methods, Computed, Record<PropNames, any>>;
    extend<S, Data, Methods, Computed, Props>(
      options?: ThisTypedComponentOptionsWithRecordProps<S & V, Data, Methods, Computed, Props>
    ): ExtendedVue<V, Data, Methods, Computed, Props>;
  }
}

declare module "vue-router" {
  interface R extends RouteConfig {
    meta?: {
      beforeResolve?: (
        to: Route,
        from: Route,
        next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
      ) => void;
    } & { [key: string]: any };
    children?: R[];
  }
}

declare global {
  type State<T> = T extends Store<infer State> ? State : never;

  interface Window {
    mobilecheck: () => boolean;
    opera: string;
  }
}
