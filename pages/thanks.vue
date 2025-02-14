<template>
  <div class="errorPage">
    <div class="container">
      <div class="errorPage__main">
        <h1>Спасибо</h1>
        <div class="errorImg">
          <img src="/assets/img/loader.png" />
        </div>
        <p>
          {{ "" }}
        </p>
        <btn theme="white" name="На главную" @click="navigateTo('/')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import btn from "~/components/ui/buttons/btn.vue";
</script>

<style scoped lang="scss">
.errorPage__main {
  color: $white;
  @include flex-center;
  flex-direction: column;
  gap: 3rem;
  padding: 7rem 0;
  h1 {
    font-size: 20rem;
    font-family: $font_2;
  }

  p {
    font-size: 2.4rem;
    color: $light-blue;
  }
}
</style>
