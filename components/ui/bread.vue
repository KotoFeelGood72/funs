<template>
  <nav aria-label="breadcrumbs" class="breadcrumbs">
    <div class="first">
      <NuxtLink to="/">
        <p>Главная</p>
        <Icon name="f:right" :size="16" />
      </NuxtLink>
    </div>
    <ul>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <!-- Если это не последний элемент, делаем ссылку -->
        <span v-if="index !== breadcrumbs.length - 1">
          <NuxtLink :to="crumb.path">{{ crumb.title }}</NuxtLink>
        </span>
        <!-- Последний элемент - просто текст -->
        <span v-else>{{ crumb.title }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

// Доступ к текущему маршруту
const route = useRoute();
const router = useRouter();

// Вычисляем хлебные крошки
const breadcrumbs = computed(() => {
  const crumbs = [];
  let currentPath = "";

  // Проходимся по каждому сегменту маршрута
  route.matched.forEach((route) => {
    currentPath += route.path;

    // Получаем title из мета-данных
    const title = route.meta.title || "Без названия";

    crumbs.push({
      path: currentPath,
      title,
    });
  });

  return crumbs;
});
</script>

<style scoped lang="scss">
.first {
  a {
    @include flex-start;
    gap: 1.6rem;
    font-size: 1.8rem;
    color: $blue;
    font-family: $font_2;
  }
}

nav {
  @include flex-start;
  gap: 1.6rem;
  span {
    font-family: $font_3;
    font-weight: 500;
  }
}
</style>
