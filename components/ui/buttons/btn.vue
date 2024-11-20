<template>
  <div class="btn" :class="[isColorTheme]">
    <div class="loading" v-if="loading">
      <Icon name="svg-spinners:eclipse" />
    </div>
    <p>{{ name }}</p>
    <div class="icon" v-if="icon">
      <Icon :name="'f:' + icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  loading?: boolean;
  icon?: string;
  theme?: string;
}>();

const isColorTheme = computed(() => {
  switch (props.theme) {
    case "white":
      return "theme-white";
    case "transparent":
      return "theme-transparent";
    case "primary":
      return "theme-primary";
    case "secondary":
      return "theme-secondary";
  }
});
</script>

<style scoped lang="scss">
.btn {
  @include flex-start;
  padding: 1.4rem 2.4rem;
  border-radius: 3rem;
  border: 0.1rem solid $blue;
  cursor: pointer;
  gap: 0.8rem;
  color: $blue;
  font-family: $font_3;
  transition: all 0.3s ease-in-out;

  &.theme-white {
    background-color: $white;
    color: $blue;
    border-color: $white;
    &:hover {
      border-color: $light;
      background-color: $light;
      color: $blue;
    }
  }
  &.theme-transparent {
    background-color: transparent;
    color: $white;
    &:hover {
      border-color: transparent;
      background-color: transparent;
      color: rgba(255, 255, 255, 0.589);
    }
  }
  &:hover {
    background-color: $blue;
    color: $white;
  }
}

.loading {
  @include flex-center;
}
.icon {
  @include flex-center;
}
</style>
