<template>
  <div class="page">
    <Hero :title="false" class="articles-filter" />
    <div class="articles">
      <div class="container">
        <bread :breadcrumbs="[{ title: 'Блог', path: '/blog' }]" />
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
            <Post
              :post="item"
              size="big"
              v-for="item in blogs['post_of_the_day']"
            />
            <div class="grid_w">
              <sectionHead title="Избранные посты" link="/" />
              <div class="grid">
                <Post
                  :post="item"
                  v-for="(item, i) in blogs['all']"
                  :key="'post-item-' + i"
                />
              </div>
            </div>
          </div>
          <div class="sidebar">
            <sectionHead title="Новые посты" link="/" />
            <div class="grid-3-mobile">
              <Post
                :post="item"
                v-for="(item, i) in blogs['new']"
                :key="'post-item-side-' + i"
              />
            </div>
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

import { useBlogs } from "~/composables/useBlogs";

const { fetchBlogs, blogs } = useBlogs();

definePageMeta({
  title: "Блог",
});

onMounted(async () => {
  // fetchBlogs();
  await fetchBlogs("all");
  await fetchBlogs("new");
  await fetchBlogs("post_of_the_day");

  useHead({
    title: "Funbooking - Блог",
  });
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

  @include bp($point_2) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  h1 {
    font-size: 6.4rem;

    @include bp($point_2) {
      font-size: 3.2rem;
    }
    b {
      font-style: italic;
      font-weight: 900;
      font-family: $font_5;
    }
  }

  p {
    font-size: 1.8rem;
    max-width: 130rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
}

.articles_row {
  @include flex-start;
  gap: 13.8rem;
  align-items: flex-start;
  @include bp($point_2) {
    width: 100%;
    flex-direction: column;
    gap: 4rem;
  }
}

.sidebar {
  max-width: 30%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @include bp($point_2) {
    max-width: 100%;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2.4rem;
  @include bp($point_2) {
    gap: 1.6rem;
  }
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
