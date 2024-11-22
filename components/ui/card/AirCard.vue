<template>
  <div class="air">
    <div class="air_action">
      <div class="price">600 ₽</div>
      <div class="badge">
        <p>Багаж</p>
        <div class="ic">
          <Icon name="f:tright" />
        </div>
      </div>
      <btn name="Бронировать для визы" />
    </div>
    <div class="air-content">
      <!-- <AirHead /> -->
      <!-- <AirInfo /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import btn from "../buttons/btn.vue";
import AirHead from "../air/AirHead.vue";
import AirInfo from "../air/AirInfo.vue";
</script>

<style scoped lang="scss"></style>
