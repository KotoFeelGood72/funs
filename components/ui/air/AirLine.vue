<template>
  <div class="line__w">
    <div class="top-label">в пути: {{ time }}</div>
    <div class="bottom-label">{{ num }} {{ isCountTxt }}</div>
    <div class="line">
      <span
        class="marker"
        v-for="index in num"
        :key="index"
        :style="{ left: `${50 + ((index - (num + 1) / 2) * 100) / num}%` }"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  num: number;
  time: string;
}>();

const isCountTxt = computed(() => {
  if (props.num === 1) return "пересадка";
  if (props.num >= 2 && props.num <= 4) return "пересадки";
  return "пересадок";
});
</script>

<style scoped lang="scss">
.line__w {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}

.top-label {
  font-size: 1.4rem;
  color: $gray;
  margin-bottom: 0.8rem;
  font-family: $font_2;

  @include bp($point_2) {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
  }
}

.line {
  position: relative;
  width: 100%;
  height: 0.2rem;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #cce4ff 50%, transparent 50%);
  background-size: 2rem 0.2rem;
}

.marker {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.6rem;
  height: 1.6rem;
  border: 0.2rem solid $light;
  border-radius: 50%;
  background-color: $white;
  transform: translate(-50%, -50%);
}

.bottom-label {
  color: $light;
  font-size: 1.4rem;
  font-family: $font_2;
  margin-bottom: 1rem;

  @include bp($point_2) {
    font-size: 1.2rem;
  }
}
</style>
