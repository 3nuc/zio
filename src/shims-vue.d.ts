declare module "*.vue" {
  import { DefineComponent, defineComponent } from "vue";
  const Component: DefineComponent<any, any>;
  export default Component;
}
