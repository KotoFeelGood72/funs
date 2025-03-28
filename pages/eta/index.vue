<template>
  <div class="eta">
    <ContentView :is-loading="false">
      <div class="eta__head">
        <eta @get-eta="" />
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
          </div>
        </div>
        <div class="eta__img">
          <img src="" alt="" />
        </div>
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import eta from "~/components/ui/filters/eta.vue";
import ContentView from "~/components/shared/ContentView.vue";
import infoText from "~/components/ui/info-text.vue";
</script>

<style scoped lang="scss"></style>
