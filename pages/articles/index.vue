<template>
  <div class="articles">
    <div class="container">
      <bread />
      <div class="articles_head">
        <h1>Блог от Funbooking</h1>
        <p>
          Здесь публикуются и обсуждаются технические новости наших сервисов,
          отзывы и пожелания наших пользователей, статьи о путешествиях, новости
          туризма. Мы всегда будем рады услышать ваше мнение, критику,
          пожелания, чтобы стать еще лучше для Вас!
        </p>
      </div>
      <div class="articles_row">
        <sectionHead title="Пост дня" />
        <div class="content">
          <Post :post="post" />
          <div class="grid_w">
            <sectionHead title="Избранные посты" link="/" />
            <div class="grid">
              <Post
                :post="post"
                v-for="(item, i) in 4"
                :key="'post-item-' + i"
              />
            </div>
          </div>
        </div>
        <div class="sidebar">
          <sectionHead title="Новые посты" link="/" />
          <Post
            :post="post"
            v-for="(item, i) in 2"
            :key="'post-item-side-' + i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bread from "~/components/ui/bread.vue";
import Post from "~/components/ui/card/Post.vue";
import btn from "~/components/ui/buttons/btn.vue";
import sectionHead from "~/components/ui/section-head.vue";

const post = {
  title: "Заголовок",
  txt: "Принимая во внимание показатели успешности, убеждённость некоторых оппонентов требует определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта, в своём классическом представлении, допускает внедрение распределения внутренних резервов и ресурсов.",
  img: "/img/preview.jpg",
  id: "12",
};
</script>

<style scoped lang="scss"></style>
