<template>
  <div class="post">
    <div class="post_img">
      <img :src="post.img" />
    </div>
    <div class="post_content">
      <h3>{{ post.title }}</h3>
      <p>{{ post.txt }}</p>
      <div class="post_link">
        <p>Подробнее</p>
        <div class="ic">
          <Icon name="f:right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  post: any;
}>();
</script>

<style scoped lang="scss">
.post_img {
  width: 100%;
  height: 100%;
  @include flex-center;
  img {
    width: 100%;
  }
}

.post {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
