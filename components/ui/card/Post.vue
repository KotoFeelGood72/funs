<template>
  <NuxtLink :to="'/articles/' + post.slug">
    <div class="post">
      <div class="post_img">
        <img :src="post.image" />
      </div>
      <div class="post_content">
        <h3>{{ post.title }}</h3>
        <div class="desc">
          <p>{{ post.body }}</p>
        </div>
        <div class="post_link">
          <p>Подробнее</p>
          <div class="ic">
            <Icon name="f:right" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    post: any;
  }>(),
  {
    post: {
      img: "",
      title: "",
      txt: "",
    },
  }
);
</script>

<style scoped lang="scss">
.post {
  @include flex-start;
  gap: 3.2rem;

  h3 {
    font-size: 2.4rem;
  }

  .desc {
    max-height: 6rem;
    overflow: hidden;
    padding: 0.8rem 0 1.6rem 0;
  }
}
.post_img {
  width: 100%;
  height: 20rem;
  @include flex-center;
  border-radius: 0.8rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.post {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.post_link {
  @include flex-end;
  gap: 0.8rem;
  color: $blue;
  cursor: pointer;
  padding: 1.2rem 0;
  p {
    font-size: 1.8rem;
    font-family: $font_2;
  }
  .ic {
    transform: rotate(45deg);
  }
}
</style>
