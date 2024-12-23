<template>
  <div class="page">
    <Hero :title="false" class="articles-filter" />
    <div class="articles">
      <div class="container">
        <bread />
        <div class="articles_head">
          <h1>Блог от <b>Funbooking</b></h1>
          <p>
            Здесь публикуются и обсуждаются технические новости наших сервисов,
            отзывы и пожелания наших пользователей, статьи о путешествиях,
            новости туризма. Мы всегда будем рады услышать ваше мнение, критику,
            пожелания, чтобы стать еще лучше для Вас!
          </p>
        </div>
        <div class="articles_row">
          <div class="content">
            <sectionHead title="Пост дня" />
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
  </div>
</template>

<script setup lang="ts">
import bread from "~/components/ui/bread.vue";
import Post from "~/components/ui/card/Post.vue";
import sectionHead from "~/components/ui/section-head.vue";
import Hero from "~/components/screens/Hero.vue";

const post = {
  title: "Заголовок",
  txt: "Принимая во внимание показатели успешности, убеждённость некоторых оппонентов требует определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта, в своём классическом представлении, допускает внедрение распределения внутренних резервов и ресурсов.",
  img: "/img/preview.jpg",
  id: "12",
};

definePageMeta({
  title: "Блог",
});
</script>

<style scoped lang="scss">
.articles-filter {
  margin: 8rem 0;
}

.articles {
  background-color: $white;
  border-radius: 3.2rem;
  padding: 3.2rem 0;
}

.articles_head {
  margin: 3.2rem 0;
  h1 {
    font-size: 6.4rem;
    b {
      font-style: italic;
      font-weight: 900;
      font-family: $font_5;
    }
  }

  p {
    font-size: 1.8rem;
    max-width: 130rem;
  }
}

.articles_row {
  @include flex-start;
  gap: 13.8rem;
  align-items: flex-start;
}

.sidebar {
  max-width: 30%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2.4rem;
}

.grid_w {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}
</style>
