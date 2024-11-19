<template>
  <nav class="list">
    <NuxtLink v-for="(item, i) in list" :to="item.link">
      <p>{{ item.name }}</p>
      <div class="icon">
        <Icon name="f:right" :size="14" />
      </div>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
interface list {
  link?: string;
  name?: string;
}
defineProps<{
  list?: list[];
}>();
</script>

<style scoped lang="scss">
.list {
  @include flex-start;
  gap: 2.4rem;

  a {
    @include flex-center;
    padding: 1.4rem 2.4rem;
    color: $blue;
    font-family: $font_3;
    gap: 0.8rem;
    &:hover {
      .icon {
        transform: translateX(0.5rem);
      }
    }
  }
}

.icon {
  @include flex-center;
  transition: all 0.3s ease-in-out;
}
</style>
