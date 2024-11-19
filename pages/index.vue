<template>
  <div class="home">
    <Hero>
      <Tabs :tabs="tabList">
        <template #tab-0>
          <air />
        </template>
        <template #tab-1>
          <h2>Контент таба 2</h2>
          <p>Это содержимое второго таба.</p>
        </template>
        <template #tab-2>
          <h2>Контент таба 3</h2>
          <p>Это содержимое третьего таба.</p>
        </template>
      </Tabs>
    </Hero>
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/screens/Hero.vue";
import Tabs from "~/components/ui/Tabs.vue";
import air from "~/components/ui/filters/air.vue";

const tabList = [{ label: "Билеты" }, { label: "Отели" }, { label: "ETA" }];
</script>

<style scoped lang="scss"></style>
