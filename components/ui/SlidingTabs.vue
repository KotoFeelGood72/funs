<template>
  <div class="container">
    <div class="tabs">
      <div class="tab-links">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          class="tab-link"
          @click="setActiveTab(index)"
          ref="tabRefs"
        >
          {{ tab.label }}
        </div>
        <div
          class="slider"
          :style="{ width: `${sliderWidth}px`, left: `${sliderLeft}px` }"
        ></div>
      </div>
      <div class="tab-content">
        <KeepAlive>
          <component :is="tabs[activeTab].component" />
        </KeepAlive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{
  tabs: Array<{ label: string; component: any }>; // Список вкладок
}>();

const activeTab = ref(0); // Активная вкладка
const tabRefs = ref<Array<HTMLElement | null>>([]); // Ссылки на вкладки
const sliderWidth = ref(0); // Ширина полосы
const sliderLeft = ref(0); // Позиция полосы

const route = useRoute();
const router = useRouter();

// Установка активной вкладки
const setActiveTab = (index: number) => {
  activeTab.value = index;
  // Обновляем query параметры
  router.replace({ query: { ...route.query, tab: index } });
};

// Обновление полосы
const updateSlider = () => {
  const activeTabElement = tabRefs.value[activeTab.value];
  if (activeTabElement) {
    sliderWidth.value = activeTabElement.offsetWidth;
    sliderLeft.value = activeTabElement.offsetLeft;
  }
};

// Синхронизация вкладки с query параметром
const syncTabWithQuery = () => {
  const tabFromQuery = parseInt(route.query.tab as string, 10);
  if (
    !isNaN(tabFromQuery) &&
    tabFromQuery >= 0 &&
    tabFromQuery < props.tabs.length
  ) {
    activeTab.value = tabFromQuery;
  } else {
    activeTab.value = 0; // Устанавливаем по умолчанию первую вкладку
  }
  nextTick(() => updateSlider());
};

// Слежение за query параметрами
watch(() => route.query.tab, syncTabWithQuery);

// Обновляем полоску при смене вкладки
watch(activeTab, () => {
  nextTick(() => updateSlider());
});

// Обновляем полоску после монтирования
onMounted(() => {
  nextTick(() => {
    tabRefs.value = Array.from(
      document.querySelectorAll(".tab-link")
    ) as HTMLElement[];
    syncTabWithQuery();
  });
});
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $white;
  border-radius: 3.2rem;
  padding: 3.2rem;

  .tab-links {
    display: flex;
    position: relative;
    border-bottom: 0.1rem solid #b2b2b2;
    max-width: 65.1rem;
    margin: 0 auto;

    .tab-link {
      position: relative;
      font-size: 1.8rem;
      padding: 1.6rem 2.4rem;
      @include flex-center;
      font-family: $font_3;
      color: $gray;
      cursor: pointer;

      &.active {
        color: $blue;
      }

      &:hover {
        color: $blue;
      }
    }

    .slider {
      position: absolute;
      bottom: -0.1rem;
      height: 1px;
      background-color: $blue;
      transition: width 0.3s, left 0.3s;
    }
  }

  .tab-content {
    margin-top: 1rem;
  }
}
</style>
