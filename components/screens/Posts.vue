<template>
  <div class="posts">
    <div class="container">
      <div class="posts-head">
        <h3>Блог</h3>
        <btn
          name="Смотреть все"
          icon="mynaui:arrow-right"
          theme="transparent"
          @click="router.push('/articles')"
        />
      </div>
      <div class="post__w">
        <ul class="posts-grid">
          <li v-for="(item, i) in posts" :key="'home-post-item-' + i">
            <Post :post="item" />
          </li>
        </ul>
        <div class="adv">
          <div class="adv_item"><img src="~/assets/img/adv.png" /></div>
          <div class="adv_item"><img src="~/assets/img/adv.png" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Post from "../ui/card/Post.vue";
import btn from "../ui/buttons/btn.vue";
import { useRouter } from "vue-router";

defineProps<{
  posts: any;
}>();

const router = useRouter();
</script>

<style scoped lang="scss">
.post__w {
  @include flex-start;
  align-items: flex-start;
  gap: 2.4rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 1rem;
  }
}
.posts {
  background-color: $blue;
  color: $white;
}

.posts-head {
  @include flex-space;
  margin-bottom: 3.2rem;
  h3 {
    font-size: 3.2rem;
  }

  :deep(.btn) {
    @include bp($point_2) {
      width: auto;
    }
  }
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 3.2rem;
  max-width: 118.8rem;

  @include bp($point_2) {
    max-width: 100%;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
}

.adv {
  @include flex-start;
  flex-direction: column;
  gap: 3.2rem;

  @include bp($point_2) {
    flex-direction: row;
    gap: 1rem;
  }
  div {
    width: 100%;
    height: 100%;
    @include flex-center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
