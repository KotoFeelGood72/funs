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
const props = defineProps<{
  post: any;
}>();
</script>

<style scoped lang="scss"></style>
