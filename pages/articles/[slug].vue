<template>
  <section class="articles" v-if="post">
    <Hero :title="false" class="articles-filter" />
    <div class="articles_main">
      <div class="container">
        <div class="articles__col">
          <bread
            class="breadcrums"
            :breadcrumbs="[
              { title: 'Блог', path: '/articles' },
              { title: post.title, path: '/' },
            ]"
          ></bread>

          <div class="articles__head">
            <h1>{{ post.title }}</h1>
            <div class="articles_timeread">
              {{ post.reading_time }} <Icon name="famicons:time-outline" />
            </div>
          </div>
          <div class="articles_img">
            <img :src="post.image" />
          </div>
          <div class="articles__row">
            <div class="articles__content">
              <h2>{{ post.title_h2 }}</h2>
              <div class="articles_txt">
                <h3>{{ post.subtitle }}</h3>
                <p>
                  {{ post.body }}
                </p>
              </div>
              <btn name="Поделиться" icon="share-2" theme="blue" />
            </div>
            <div class="articles_aside">
              <sectionHead title="Новые посты" link="/" />
              <div class="post__new grid-3-mobile">
                <Post
                  v-for="(item, i) in blogs['new']"
                  :key="'post-item-' + i"
                  :post="item"
                />
              </div>
            </div>
          </div>
          <div class="articles__additionaly">
            <div class="grid_w">
              <sectionHead title="Избранные посты" link="/" />
              <div class="grid-3">
                <Post
                  v-for="(item, i) in blogs['featured']"
                  :key="'post-item-' + i"
                  :post="item"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import btn from "~/components/ui/buttons/btn.vue";
import sectionHead from "~/components/ui/section-head.vue";
import Post from "~/components/ui/card/Post.vue";
import bread from "~/components/ui/bread.vue";
import Hero from "~/components/screens/Hero.vue";
import { useBlogs } from "~/composables/useBlogs";

import { useRoute } from "vue-router";

const route = useRoute();

const { fetchBlogsSlug, post, fetchBlogs, blogs } = useBlogs();

onMounted(async () => {
  await fetchBlogsSlug(route.params.slug.toString());
  await fetchBlogs("new");
  await fetchBlogs("featured");

  useHead({
    title: `Funbooking - Блог - ${post.value?.title}`,
  });
});
</script>

<style scoped lang="scss">
.articles-filter {
  padding: 8rem 0;
}

.articles_main {
  background-color: $white;
  border-radius: 3.2rem;
  padding: 3.2rem 0;

  h1 {
    font-size: 6.4rem;
  }
}

.articles_timeread {
  @include flex-start;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: $dark;
}

.articles_img {
  width: 100%;
  height: auto;
  border-radius: 2.4rem;
  overflow: hidden;
  @include bp($point_2) {
    max-height: 25rem;
  }
  img {
    object-fit: cover;
  }
}

.articles__col {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}

.articles__row {
  @include flex-start;
  align-items: flex-start;
  gap: 13.8rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 6rem;
  }
}
.articles__content {
  max-width: 99.4rem;

  & > h2 {
    margin-bottom: 1.6rem;
  }

  :deep(.btn) {
    display: inline-flex;
  }
}

.articles_txt {
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5rem 0;
  }

  p,
  ul,
  li {
    margin: 1rem 0;
  }
}

.articles_txt > p {
  margin-bottom: 4rem;
}

.articles_aside {
  max-width: 50rem;
}

.articles_aside,
.articles__additionaly {
  :deep(.section-head) {
    margin-bottom: 1.6rem;
  }
}

.post__new {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.articles__head {
  h1 {
    @include bp($point_2) {
      font-size: 2.6rem;
    }
  }
}
</style>
