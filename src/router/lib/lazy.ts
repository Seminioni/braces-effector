import { CreateElement, RenderContext } from "vue";

export default function lazy(AsyncView: any) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // eslint-disable-next-line
    loading: require("@/ui/PageLoader.vue"),
    timeout: 1000,
  });

  return () => Promise.resolve({
    functional: true,
    render(h: CreateElement, { data, children }: RenderContext) {
      return h(AsyncHandler, data, children);
    },
  });
}
