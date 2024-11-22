<template>
  <div class="home">
    <div class="start">
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
      <Divider :height="8" />
      <Preview />
      <Divider :height="8" />
    </div>
    <Faq />
    <Divider :height="8" :color="true" />
    <Posts :posts="posts" />
    <Divider :height="8" :color="true" />
    <section class="quote">
      <div class="container">
        <div class="quote_main">
          <h2>бронировать с</h2>
          <div class="qoute_row">
            <img src="~/assets/img/pic-logo.png" />
            <h3>Funbooking</h3>
          </div>
          <h4>— это весело!</h4>
        </div>
      </div>
    </section>
    <section class="services">
      <div class="container">
        <div class="services_main">
          <div class="service_card">
            <div class="service_card__img">
              <img src="" alt="" />
            </div>
            <div class="service_card__content">
              <h3>Text</h3>
              <p>
                Приятно, граждане, наблюдать, как представители современных
                социальных резервов формируют глобальную экономическую сеть и
                при этом — ассоциативно распределены по отраслям.
              </p>
              <btn name="Найти отель" icon="right" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="callback">
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
import Preview from "~/components/screens/Preview.vue";
import Faq from "~/components/screens/Faq.vue";
import Divider from "~/components/ui/Divider.vue";
import Posts from "~/components/screens/Posts.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Form from "~/components/shared/Form.vue";

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
</script>

<style scoped lang="scss">
.start {
  background: linear-gradient(180deg, #ffffff 0%, #a2d0ff 80%, #0a66c2 100%);
  mix-blend-mode: multiply;
}
</style>
