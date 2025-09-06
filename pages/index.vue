<template>
  <div class="home">
    <div class="start">
      <Hero />
      <Divider :height="8" class="hero-divider" />
      <Preview />
      <Divider :height="8" />
    </div>
    <Faq :faqs="questions" />
    <Divider :height="8" :color="true" />
    
    <Posts :posts="blogs['featured']" >
      <div id="yandex_rtb_R-A-14701543-1"></div>
    </Posts>
    <Divider :height="8" :color="true" />
    <section class="quote blue">
      <div class="container">
        <div class="quote_main">
          <h2>бронировать с</h2>
          <div class="qoute_row">
            <img src="~/assets/img/quote-logo.png" />
            <h3>Funbooking</h3>
          </div>
          <h4>— это весело!</h4>
        </div>
        <p>Готовы?</p>
      </div>
    </section>
    <!-- <section class="services blue">
      <div class="container">
        <div class="services_main">
          <div class="service_card">
            <div class="service_card__img">
              <img src="~/assets/img/new.png" />
            </div>
            <div class="service_card__content">
              <h3>Text</h3>
              <p>
                Приятно, граждане, наблюдать, как представители современных
                социальных резервов формируют глобальную экономическую сеть и
                при этом — ассоциативно распределены по отраслям.
              </p>
              <btn name="Забронировать билет" icon="right" theme="primary" />
            </div>
          </div>
          <div class="service_card">
            <div class="service_card__img">
              <img src="~/assets/img/new.png" />
            </div>
            <div class="service_card__content">
              <h3>Text</h3>
              <p>
                Приятно, граждане, наблюдать, как представители современных
                социальных резервов формируют глобальную экономическую сеть и
                при этом — ассоциативно распределены по отраслям.
              </p>
              <btn name="Забронировать билет" icon="right" theme="primary" />
            </div>
          </div>
          <div class="service_card">
            <div class="service_card__img">
              <img src="~/assets/img/new.png" />
            </div>
            <div class="service_card__content">
              <h3>Text</h3>
              <p>
                Приятно, граждане, наблюдать, как представители современных
                социальных резервов формируют глобальную экономическую сеть и
                при этом — ассоциативно распределены по отраслям.
              </p>
              <btn name="Забронировать билет" icon="right" theme="primary" />
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <section class="callback blue">
      <div class="container">
        <div class="callback_main">
          <div class="callback__content">
            <h3>Обратная связь</h3>
            <p>Обратитесь в поддержку</p>
          </div>
          <Form />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Типизация для Yandex.RTB
declare global {
  interface Window {
    yaContextCb: any[];
    Ya: {
      Context: {
        AdvManager: {
          render: (config: any) => void;
        };
      };
    };
  }
}

import Hero from "~/components/screens/Hero.vue";
import Preview from "~/components/screens/Preview.vue";
import Faq from "~/components/screens/Faq.vue";
import Divider from "~/components/ui/Divider.vue";
import Posts from "~/components/screens/Posts.vue";
// import btn from "~/components/ui/buttons/btn.vue";
import Form from "~/components/shared/Form.vue";
// import { useFaqs } from "~/composables/useFaqs";
import { useBlogs } from "~/composables/useBlogs";
import { questions } from "~/api/Questions";

// const { fetchFaqs, faq } = useFaqs();
const { fetchBlogs, blogs } = useBlogs();

onMounted(() => {
  // fetchFaqs();
  fetchBlogs("featured");
  
  // Инициализация Yandex.RTB рекламного блока
  window.yaContextCb.push(() => {
    window.Ya.Context.AdvManager.render({
      "blockId": "R-A-14701543-1",
      "renderTo": "yandex_rtb_R-A-14701543-1",
      "type": "feed"
    });
  });
});
</script>

<style scoped lang="scss">
.start {
  background: linear-gradient(180deg, #ffffff 0%, #a2d0ff 80%, #0a66c2 100%);
  // mix-blend-mode: multiply;
}

.quote {
  font-size: 20rem;
  color: $white;
  font-family: $font_1;
  line-height: 16rem;

  @include bp($point_2) {
    font-size: 5rem;
    line-height: 120%;
    text-align: center;
    // margin-bottom: 8rem;
  }

  img {
    height: 18rem;
    width: 40rem;

    @include bp($point_2) {
      width: auto;
      height: auto;
      max-width: 10rem;
      flex-grow: 1;
    }
  }

  h3 {
    font-family: $font_5;
    font-style: italic;
    @include bp($point_2) {
      font-size: 4rem;
    }
  }

  p {
    font-size: 2.4rem;
    font-family: $font_1;
    color: $light;
    text-align: center;
    @include bp($point_2) {
      font-size: 2rem;
    }
  }
}

.qoute_row {
  @include flex-start;
  gap: 2rem;
}

.services_main {
  @include flex-center;
  gap: 3.2rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 1rem;
  }

  :deep(.btn) {
    justify-content: center;
  }
}

.service_card {
  padding: 3.2rem;
  border-radius: 3.2rem;
  background-color: $white;

  @include bp($point_2) {
    padding: 1.6rem;
    border-radius: 1.6rem;
  }
  h3 {
    font-size: 2.4rem;
    margin-bottom: 0.8rem;
  }

  &:nth-child(1) {
    max-width: 47.6rem;
  }
  &:nth-child(2) {
    flex-grow: 1;
  }
  &:nth-child(3) {
    max-width: 47.6rem;
  }
}

.service_card__content {
  & > p {
    margin-bottom: 4rem;
  }
}

.service_card__img {
  width: 100%;
  @include flex-center;
  margin-bottom: 3.2rem;
  border-radius: 0.8rem;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
}

.callback {
  padding: 8rem 0;
}
.callback_main {
  padding: 3.2rem;
  background-color: $white;
  max-width: 94.8rem;
  margin: 0 auto;
  border-radius: 3.2rem;
  @include flex-start;
  align-items: flex-start;

  @include bp($point_2) {
    flex-direction: column;
    border-radius: 1.6rem;
    gap: 3rem;
  }

  h3 {
    font-size: 6.4rem;
    margin-bottom: 2.4rem;
    line-height: 100%;

    @include bp($point_2) {
      font-size: 2.6rem;
    }
  }
}
.callback__content {
  max-width: 40rem;
}

.advertisement {
  padding: 3.2rem 0;
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 25rem;
  }
  
  #yandex_rtb_R-A-14701543-1 {
    width: 100%;
    max-width: 100%;
  }
}
</style>
