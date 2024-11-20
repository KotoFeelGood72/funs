<template>
  <div class="posts">
    <div class="container">
      <div class="posts-head">
        <h3>Блог</h3>
        <btn name="Смотреть все" icon="right" theme="transparent" />
      </div>
      <ul class="posts-grid">
        <li v-for="(item, i) in posts" :key="'home-post-item-' + i">
          <Post :post="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Post from "../ui/card/Post.vue";
import btn from "../ui/buttons/btn.vue";

defineProps<{
  posts: any;
}>();
</script>

<style scoped lang="scss">
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
}

.posts-grid {
  display: grid;
  width: 100%;
  //   max-width: 118rem;
  gap: 2rem;
  grid-auto-flow: dense;
  grid-template-areas:
    "a b ."
    "c d e";

  li {
    &:nth-child(1) {
      grid-area: a;
    }
    &:nth-child(2) {
      grid-area: b;
    }
    &:nth-child(3) {
      grid-area: c;
    }
    &:nth-child(4) {
      grid-area: d;
    }
    &:nth-child(5) {
      grid-area: e;
    }
  }
}
</style>
