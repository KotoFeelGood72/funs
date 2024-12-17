<template>
  <nav aria-label="breadcrumbs" class="breadcrumbs">
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

<style scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.breadcrumbs ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}
.breadcrumbs li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.breadcrumbs li + li::before {
  content: "/";
  margin: 0 8px;
  color: #ccc;
}
</style>
