<template>
  <div class="eta">
    <ContentView :is-loading="false">
      <div class="eta__head">
        <eta />
      </div>
      <div class="eta_main">
        <div class="eta__forms">
          <div class="grid_data">
            <infoText
              :info="{
                icon: 'weui:time-outlined',
                label: 'Одобрение до: 14 ноября 2024',
                notice:
                  'Требуется подать заявку минимум за 4 дня, максимум за 30 дней до прибытия.',
              }"
            />
            <infoText
              :info="{
                icon: 'weui:time-outlined',
                label: 'Одобрение до: 14 ноября 2024',
                notice:
                  'Требуется подать заявку минимум за 4 дня, максимум за 30 дней до прибытия.',
              }"
            />
            <infoText
              :info="{
                icon: 'weui:time-outlined',
                label: 'Одобрение до: 14 ноября 2024',
                notice:
                  'Требуется подать заявку минимум за 4 дня, максимум за 30 дней до прибытия.',
              }"
            />
            <infoText
              :info="{
                icon: 'weui:time-outlined',
                label: 'Одобрение до: 14 ноября 2024',
                notice:
                  'Требуется подать заявку минимум за 4 дня, максимум за 30 дней до прибытия.',
              }"
            />
          </div>
          <div class="eta_forms__change">
            <Select
              :options="isListCurrentVisaType"
              v-model="visaId"
              label="Выберите тип"
            />
          </div>
        </div>
        
        <div class="eta__img">
          <img src="@/assets/img/eta.jpg" alt="" />
        </div>
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import Select from "~/components/ui/inputs/Select.vue";
import eta from "~/components/ui/filters/eta.vue";
import ContentView from "~/components/shared/ContentView.vue";
import infoText from "~/components/ui/info-text.vue";
import { useETAStoreRefs } from "~/store/useETAStore";

const { visaList, visaId } = useETAStoreRefs();

const isListCurrentVisaType = computed(() =>
  visaList?.value.map((el: any) => ({
    name: el.name,
    value: el.id,
  }))
);
</script>

<style scoped lang="scss">
.eta_main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 3.2rem;
}

.eta__img {
  img {
    width: 100%;
  }
}

.grid_data {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2.4rem;
}

.eta__head {
  margin-bottom: 3.2rem;
}
</style>
