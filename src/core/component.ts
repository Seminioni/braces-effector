import Vue, { VueConstructor } from "vue";
import { Store } from "effector";
import {
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps,
} from "vue/types/options";
import { ExtendedVue } from "vue/types/vue";

type Inference<S> = S extends Store<infer State>
    ? State
    : S extends { [storeName: string]: Store<any> }
      ? { [K in keyof S]: State<S[K]> }
      : never;


function createComponent<V extends Vue, Data, Methods, Computed, Props>(
  options: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>,
): ExtendedVue<V, Data, Methods, Computed, Props>;

function createComponent<V extends Vue, Data, Methods, Computed, PropNames extends string>(
  options: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>,
): ExtendedVue<V, Data, Methods, Computed, PropNames>;

function createComponent<
  S extends { [field: string]: Store<any> },
  V extends Vue, Data, Methods, Computed, Props
>(
  options: ThisTypedComponentOptionsWithRecordProps<
    Inference<S> & V, Data, Methods, Computed, Props
  >,
  store?: S
): ExtendedVue<V, Data, Methods, Computed, Props>;


function createComponent<
  S extends { [field: string]: Store<any> },
  V extends Vue, Data, Methods, Computed, PropNames extends string
>(
  options: ThisTypedComponentOptionsWithArrayProps<
    Inference<S> & V, Data, Methods, Computed, PropNames
  >,
  store?: S,
) {
  return Vue.extend({
    ...options,
    ...(store && {
      effector() {
        return store;
      },
    }),
  });
}

export default createComponent;
