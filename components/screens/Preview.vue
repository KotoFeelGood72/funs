<template>
  <div class="preview">
    <div class="container">
      <div class="preview_main">
        <div class="preview-list">
          <div
            class="preview-item"
            v-for="(item, i) in list"
            :key="'item-list-' + i"
            :class="{ active: activeIndex === i }"
            @click="toggleActive(i)"
          >
            <div class="row">
              <h3>{{ item.title }}</h3>
              <div class="ic" v-if="activeIndex === i">
                <Icon name="material-symbols:star" :size="25" />
              </div>
            </div>
            <Divider :height="1.6" v-if="activeIndex === i" />
            <div
              class="accordion-content"
              :style="{
                height: activeIndex === i ? contentHeights[i] + 'px' : '0px',
              }"
              ref="contentRefs"
            >
              <p>
                {{ item.txt }}
              </p>
            </div>
          </div>
        </div>
        <div class="preview-video">
          <img src="~/assets/img/faq.jpg" alt="" />
          <!-- <video autoplay muted loop :key="activeIndex">
            <source :src="list[activeIndex].video" type="video/webm" />
          </video> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import Divider from "../ui/Divider.vue";

const list = ref<any>([
  {
    title: "Официальная бронь авиабилета 1",
    txt: "Бронь авиабилета можно проверить на сайте авиакомпании после оплаты заказа.",
    video:
      "https://runway.com/static/1-Product-Benefit-Intro-44d54a620a8ec43753fb09e409b63555.webm",
  },
  {
    title: "Официальная бронь авиабилета 2",
    txt: "Бронь авиабилета можно проверить на сайте авиакомпании после оплаты заказа.",
    video: "https://runway.com/static/ambient-ai-7379852bd1bdaaa4fce022116b7c4a1d.webm",
  },
  {
    title: "Официальная бронь авиабилета 3",
    txt: "Бронь авиабилета можно проверить на сайте авиакомпании после оплаты заказа.",
    video: "https://runway.com/static/ambient-ai-7379852bd1bdaaa4fce022116b7c4a1d.webm",
  },
  {
    title: "Официальная бронь авиабилета 4",
    txt: "Бронь авиабилета можно проверить на сайте авиакомпании после оплаты заказа.",
    video: "https://runway.com/static/ambient-ai-7379852bd1bdaaa4fce022116b7c4a1d.webm",
  },
]);

const activeIndex = ref<number | null>(0);
const contentRefs = ref<HTMLElement[]>([]);
const contentHeights = ref<number[]>([]);

const calculateHeights = async () => {
  await nextTick(); // Ждем рендеринга DOM
  contentRefs.value = contentRefs.value.slice(0, list.value.length); // Убираем лишние рефы
  contentHeights.value = contentRefs.value.map((el) => (el ? el.scrollHeight : 0)); // Записываем высоты контента
};

onMounted(() => {
  calculateHeights();
});

const toggleActive = (index: number) => {
  if (activeIndex.value !== index) {
    activeIndex.value = index;
  }
};
</script>

<style scoped lang="scss">
.preview_main {
  display: flex;
  height: 68rem;
  gap: 2.4rem;
  @include bp($point_2) {
    flex-direction: column;
    height: auto;
  }
}

.preview-video {
  max-width: 60%;
  width: 100%;
  height: 100%;
  border-radius: 3.2rem;
  overflow: hidden;
  @include bp($point_2) {
    order: 0;
    max-width: 100%;
    border-radius: 1.6rem;
  }

  img {
    @include bp($point_2) {
      width: 100%;
      height: auto;
    }
  }
}

.preview-list {
  background-color: $blue;
  border-radius: 3.2rem;
  padding: 3.2rem;
  color: $white;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  @include bp($point_2) {
    order: 1;
    padding: 2rem 1rem;
    border-radius: 1rem;
  }
  h3 {
    font-size: 3.2rem;
    color: $light;
    font-family: $font_1;
    @include bp($point_2) {
      font-size: 1.8rem;
    }
  }
}

.preview-item {
  padding: 2.4rem 0;
  cursor: pointer;
  overflow: hidden;
  opacity: 0.5;
  transition: all 0.3s;
  flex-grow: 0;
  @include bp($point_2) {
    padding: 1.5rem 0;
  }
  &:not(:last-child) {
    border-bottom: 0.1rem solid $light;
  }
  &.active {
    flex-grow: 1;
    opacity: 1;
    h3 {
      color: $white;
    }
  }
}

.accordion-content {
  overflow: hidden;
  transition: height 0.3s ease; /* Анимация плавного изменения высоты */
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ic {
  display: flex;
  justify-content: center;
  align-items: center;

  @include bp($point_2) {
    width: 2rem;
    height: 2rem;
  }
}
</style>
