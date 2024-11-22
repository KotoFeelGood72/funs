<template>
  <div class="line__w">
    <div class="line"></div>
    <div class="label">{{ num }} {{ isCountTxt }}</div>
    <div class="marker" v-for="item in num.length"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  num: any;
}>();

const isCountTxt = computed(() => {
  switch (props.num) {
    case 1:
      return "пересадка";
    default:
      return "пересадки";
  }
});
</script>

<style scoped lang="scss"></style>
