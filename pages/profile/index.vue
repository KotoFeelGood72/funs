<template>
  <div class="profile">
    <SlidingTabs
      :tabs="[
        { label: 'Заказы', component: orders },
        { label: 'Профиль', component: profile },
        { label: 'История', component: history },
        { label: 'Поддержка', component: support },
        { label: 'Настройки', component: settings },
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import SlidingTabs from "~/components/ui/SlidingTabs.vue";
import orders from "./tab/orders.vue";
import support from "./tab/support.vue";
import history from "./tab/history.vue";
import settings from "./tab/settings.vue";
import profile from "./tab/profile.vue";
</script>

<style lang="scss" scoped>
.profile {
  background-color: $blue;
  padding: 8rem 0;
}
</style>
