<template>
  <div class="air">
    <ContentView title="Москва — Амстердам">
      <div class="top">
        <air />
      </div>
      <div class="row">
        <div class="sidebar">
          <Sidebar />
        </div>
        <div class="content">
          <div class="top-content">
            <InputsSearch />
            <RadioGroup :items="sort" name="sortering" v-model="selectedSort" />
            <btn name="Обновить" icon="reset" theme="white" />
          </div>
          <div class="content-col">
            <AirCard v-for="(item, i) in 7" :key="'air-items-' + i" />
          </div>
        </div>
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import Sidebar from "~/components/shared/Sidebar.vue";
import air from "~/components/ui/filters/air.vue";
import InputsSearch from "~/components/ui/inputs/InputsSearch.vue";
import RadioGroup from "~/components/ui/inputs/RadioGroup.vue";
import btn from "~/components/ui/buttons/btn.vue";
import AirCard from "~/components/ui/card/AirCard.vue";

const sort = ref<any>([
  { name: "Новые", val: "new" },
  { name: "Популярные", val: "popular" },
  { name: "Сначала дешевле", val: "downprice" },
  { name: "Сначала дороже", val: "upprice" },
]);

const selectedSort = ref<any>();
</script>

<style scoped lang="scss"></style>
