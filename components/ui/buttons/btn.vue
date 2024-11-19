<template>
  <div class="btn">
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
defineProps<{
  name: string;
  loading?: boolean;
  icon?: string;
}>();
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
