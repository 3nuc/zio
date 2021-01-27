<template>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <ProgressSpinner v-if="loading" />
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <slot v-else />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ProgressSpinner from "primevue/progressspinner";





export default defineComponent({
  components: { ProgressSpinner },
  props: {
    loading: { type: Boolean, default: true },
    size: {
      type: String,
      default: "100",
      validator: (val: unknown) => !isNaN(Number(val)) && Number(val) > 0,
    },
  },
  setup(props) {
    return {
      sizeFormatted: computed(() => `${Number(props.size)}px`),
    };
  },
});
</script>

<!--eslint-disable-next-line prettier/prettier-->
<style scoped lang="scss">
@mixin anim-infinite($name, $duration) {
  animation-name: $name;
  animation-duration: $duration;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.wrapper {
  position: relative;
}
.spinner {
  width: var(--sizeFormatted);
  height: var(--sizeFormatted);
  margin: 20px;
  background: $color-primary;
  position: absolute;
}

.spinner1 {
  background: $color-primary;
  @include anim-infinite(spin2, 1500ms);
}
.spinner2 {
  background: $color-secondary;
  border: $color-light 5px solid;
  @include anim-infinite(spin2, 700ms);
}

@keyframes spin1 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin2 {
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(450deg);
  }
}
</style>
