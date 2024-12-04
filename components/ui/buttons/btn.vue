<template>
  <div class="btn" :class="[isColorTheme, isSize]">
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
  size?: string
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
const isSize = computed(() => {
  switch (props.size) {
    case "small":
      return "small-btn";
    case "normal":
      return "normal-btn";
    case "medium":
      return "medium-btn";
    case "large":
      return "large-btn";
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

  &.small-btn {
    padding: 1.4rem 2.4rem;
    height: 4rem;
  }
  &.normal-btn {
    padding: 1.4rem 2.4rem;
    height: 5rem;
  }
  &.medium-btn {
    padding: 1.4rem 2.4rem;
    height: 5rem;
  }
  &.large-btn {
    padding: 1.4rem 2.4rem;
    height: 5rem;
  }

  &.theme-white {
    background-color: $white;
    color: $blue;
    border-color: $white;
    &:hover {
      border-color: transparent;
      background-color: transparent;
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
  &.theme-primary {
    background-color: $blue;
    color: $white;
    &:hover {
      background-color: transparent;
      color: $blue;
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
