<template>
  <div class="layouts">
    <Header />
    <slot />
    <div class="footer__w blue">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";
</script>

<style scoped lang="scss">
.footer__w {
  padding-top: 9.6rem;
  position: relative;
}
</style>
