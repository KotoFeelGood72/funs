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

  @include bp($point_2) {
    gap: 1rem;
  }

  h3 {
    font-size: 2.4rem;
    @include bp($point_2) {
      font-size: 1.6rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .desc {
    max-height: 5.9rem;
    overflow: hidden;
    padding: 0.8rem 0 1.6rem 0;

    @include bp($point_2) {
      margin-bottom: 1rem;
    }
  }
}
.post_img {
  width: 100%;
  height: 20rem;
  @include flex-center;
  border-radius: 0.8rem;
  overflow: hidden;

  @include bp($point_2) {
    height: 10rem;
  }
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

    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
  .ic {
    transform: rotate(45deg);
  }
}
</style>
