<template>
  <div class="home">
    <div class="start">
      <Hero>
        <Tabs :tabs="tabList">
          <template #tab-0>
            <air />
          </template>
          <template #tab-1>
            <hotel />
          </template>
          <template #tab-2>
            <h2>Контент таба 3</h2>
            <p>Это содержимое третьего таба.</p>
          </template>
        </Tabs>
      </Hero>
      <Divider :height="8" />
      <Preview />
      <Divider :height="8" />
    </div>
    <Faq :faqs="faq" />
    <Divider :height="8" :color="true" />
    <Posts :posts="posts" />
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
    <section class="services blue">
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
    </section>
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
import Hero from "~/components/screens/Hero.vue";
import Tabs from "~/components/ui/Tabs.vue";
import air from "~/components/ui/filters/air.vue";
import hotel from "~/components/ui/filters/hotel.vue";
import Preview from "~/components/screens/Preview.vue";
import Faq from "~/components/screens/Faq.vue";
import Divider from "~/components/ui/Divider.vue";
import Posts from "~/components/screens/Posts.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Form from "~/components/shared/Form.vue";
import { useFaqs } from "~/composables/useFaqs";

const { fetchFaqs, faq } = useFaqs();

const tabList = [{ label: "Билеты" }, { label: "Отели" }, { label: "ETA" }];

const posts = ref<any>([
  {
    title: "Заголовок",
    txt: "Принимая во внимание показатели успешности, убеждённость некоторых оппонентов требует определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта, в своём классическом представлении, допускает внедрение распределения внутренних резервов и ресурсов.",
    img: "/img/preview.jpg",
    id: "11",
  },
  {
    title: "Заголовок",
    txt: "Принимая во внимание показатели успешности, убеждённость некоторых оппонентов требует определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта, в своём классическом представлении, допускает внедрение распределения внутренних резервов и ресурсов.",
    img: "/img/preview.jpg",
    id: "11",
  },
  {
    title: "Заголовок",
    txt: "Принимая во внимание показатели успешности, убеждённость некоторых оппонентов требует определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта, в своём классическом представлении, допускает внедрение распределения внутренних резервов и ресурсов.",
    img: "/img/preview.jpg",
    id: "11",
  },
  {
    title: "Заголовок",
    txt: "Принимая во внимание показатели успешности, убеждённость некоторых оппонентов требует определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта, в своём классическом представлении, допускает внедрение распределения внутренних резервов и ресурсов.",
    img: "/img/preview.jpg",
    id: "11",
  },
  {
    title: "Заголовок",
    txt: "Принимая во внимание показатели успешности, убеждённость некоторых оппонентов требует определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта, в своём классическом представлении, допускает внедрение распределения внутренних резервов и ресурсов.",
    img: "/img/preview.jpg",
    id: "11",
  },
]);

onMounted(() => {
  fetchFaqs();
});
</script>

<style scoped lang="scss">
.start {
  background: linear-gradient(180deg, #ffffff 0%, #a2d0ff 80%, #0a66c2 100%);
  mix-blend-mode: multiply;
}

.quote {
  font-size: 20rem;
  color: $white;
  font-family: $font_1;
  line-height: 16rem;

  img {
    height: 18rem;
    width: 40rem;
  }

  h3 {
    font-family: $font_5;
    font-style: italic;
  }

  p {
    font-size: 2.4rem;
    font-family: $font_1;
    color: $light;
    text-align: center;
  }
}

.qoute_row {
  @include flex-start;
}

.services_main {
  @include flex-center;
  gap: 3.2rem;

  :deep(.btn) {
    justify-content: center;
  }
}

.service_card {
  padding: 3.2rem;
  border-radius: 3.2rem;
  background-color: $white;
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

  h3 {
    font-size: 6.4rem;
    margin-bottom: 2.4rem;
    line-height: 100%;
  }
}
.callback__content {
  max-width: 40rem;
}
</style>
