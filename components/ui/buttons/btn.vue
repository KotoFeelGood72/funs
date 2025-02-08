<template>
  <div class="btn" :class="[isColorTheme, isSize, { disabled: disabled }]">
    <p>{{ name }}</p>
    <div class="icon" v-if="icon && !loading">
      <Icon :name="'f:' + icon" :size="15" />
    </div>
    <div class="loading" v-if="loading">
      <Icon name="svg-spinners:eclipse" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  loading?: boolean;
  icon?: string;
  theme?: string;
  size?: string;
  disabled?: boolean;
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

  @include bp($point_2) {
    width: 100%;
    justify-content: center;
  }

  &.disabled {
    pointer-events: none;
    border-color: $gray-light !important;
    background-color: $gray-light !important;
    color: $gray !important;
    cursor: none;
  }

  p {
    @include bp($point_2, $direction: min) {
      margin-bottom: -0.3rem;
    }
  }

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
      // border-color: transparent;
      // background-color: transparent;
      color: $white;
      opacity: 0.9;
      border-color: $blue;
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
