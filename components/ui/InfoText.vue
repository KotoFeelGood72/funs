<template>
  <div class="info-text">
    <div class="info_text__icon">
      <Icon :name="info.icon" :size="20" />
    </div>
    <div class="info_text__label">{{ info.label }}</div>
    <div class="info_text__info">
      <div class="info_text__info__icon">
        <Icon name="material-symbols-light:info-outline-rounded" :size="20" />
      </div>
      <p class="info_text__notice">{{ info.notice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  info: any;
}>();
</script>

<style scoped lang="scss">
.info-text {
  @include flex-start;
  padding: 1.2rem;
  gap: 0.8rem;
}

.info_text__label {
  font-size: 1.8rem;
  font-family: $font_2;
}

.info_text__icon {
  @include flex-center;
}

.info_text__info {
  position: relative;
  &:hover {
    .info_text__notice {
      opacity: 1;
      visibility: visible;
    }
  }
}
.info_text__notice {
  position: absolute;
  top: 100%;
  left: 100%;
  font-size: 1.2rem;
  background-color: #222222;
  padding: 0.4rem 0.8rem;
  min-width: 20rem;
  color: $white;
  opacity: 0;
  visibility: hidden;
}

.info_text__info__icon {
  @include flex-center;
}
</style>
