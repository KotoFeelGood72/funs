<template>
  <div class="filter-change">
    <img src="@/assets/icons/swap.svg" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.filter-change {
  @include flex-center;
  cursor: pointer;
  width: 4.5rem;

  img {
    width: 100%;
    height: 100%;
  }

  @include bp($point_2) {
    display: none;
  }
}
</style>
