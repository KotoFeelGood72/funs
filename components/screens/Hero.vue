<template>
  <div class="hero">
    <div class="container">
      <div class="hero_main">
        <div class="hero__content">
          <h2>бронь — это fun</h2>
          <div class="hero_row">
            <img src="~/assets/img/pic-logo.png" />
            <h1><b>Funbooking</b> — это бронь</h1>
          </div>
          <h2>авиабилетов, отелей и визы на срок до 14 дней․</h2>
          <p class="txt">а также страховые полисы стран евросоюза</p>
        </div>
        <div class="hero_bottom"><slot /></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.hero_main {
  color: $blue;
  background-color: $white;
  padding: 3.2rem;
  border-radius: 3.2rem;
  h2 {
    font-size: 10rem;
    line-height: 9.5rem;
  }
}

.hero_row {
  @include flex-start;
  h1 {
    font-size: 10rem;
    line-height: 9.5rem;
    b {
      font-family: $font_5;
      font-style: italic;
    }
  }
}

.txt {
  padding: 2rem 0 3.2rem 0;
  font-size: 2.4rem;
  color: $dark;
}
</style>
