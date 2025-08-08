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
              <p class="preview-text">{{ item.txt }}</p>
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
    title: "Чтобы не покупать билет - купите бронь",
    txt: `
Больше не нужно оплачивать билет целиком
Проверяемый маршрутный лист с QR-кодом
Приходит мгновенно после оплаты на ваш email
Легко продлить еще на 14 дней – пришлем письмо
Принимается всеми консульствами и визовыми центрами
`,
    video:
      "https://runway.com/static/1-Product-Benefit-Intro-44d54a620a8ec43753fb09e409b63555.webm",
  },
  {
    title: "Бронь отеля без предоплаты - для всех целей",
    txt: `
Бронирование из европейских и американских систем*
Не нужно готовить полную предоплату жилья для визы
Пришлем на ваш email 
Проверяется по коду или email
Легко продлить еще на 14 дней – пришлем письмо
*также можем забронировать проживание и не для визы
`,
    video: "https://runway.com/static/ambient-ai-7379852bd1bdaaa4fce022116b7c4a1d.webm",
  },
  {
    title: "Чтобы уехать - оплатите E-Visa и ETA ",
    txt: `
Получите электронную визу или разрешение на въезд в Корею, Индию, Саудовскую Аравию, Израиль и еще более чем в 20 других стран в срок от 10 минут
Мы заполним без ошибок заявление за вас и оплатим. Вам останется дождаться решения консульского работника на свой электронный адрес
Массовые получения E-Visa и оплаты ETA – чётко и в срок
Ваши личные данные обрабатываются профессионально и хранятся надежно в соответствии с законом – мы в реестре Роскомнадзора как Оператор персональных данных 
`,
    video: "https://runway.com/static/ambient-ai-7379852bd1bdaaa4fce022116b7c4a1d.webm",
  },
  {
    title: "Оплатить российской картой, по СБП или по счету",
    txt: `
Принимаем все карты, выпущенные российскими банками
СБП – оплата по QR-коду
Выставляем счета для юридических лиц 
Специальные цены на массовое оформление
`,
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

.preview-text {
  white-space: pre-line;
}
</style>
