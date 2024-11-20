<template>
  <div class="posts">
    <div class="container">
      <div class="posts-head">
        <h3>Блог</h3>
        <btn name="Смотреть все" icon="right" theme="transparent" />
      </div>
      <div class="posts-grid">
        <div
          class="post"
          v-for="(item, i) in posts"
          :key="'home-post-item-' + i"
          :class="['area-' + i]"
        >
          <Post :post="item" />
        </div>
      </div>
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
</style>
