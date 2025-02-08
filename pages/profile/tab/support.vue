<template>
  <div class="faq">
    <div class="small-container">
      <h2 class="faq-title">Часто задаваемые вопросы</h2>
      <div class="faq-list">
        <div class="faq-item" v-for="(item, index) in questions" :key="index">
          <div class="faq-question" @click="toggleAnswer(index)">
            {{ item.question }}
            <span class="faq-icon" :class="{ open: activeIndex === index }"
              ><Icon
                :name="activeIndex !== index ? 'f:acc-plus' : 'f:acc-minus'"
                :size="40"
            /></span>
          </div>
          <div class="faq-answer" v-if="activeIndex === index">
            {{ item.answer }}
          </div>
        </div>
      </div>

      <div class="faq-support">
        <p>
          Задайте вопрос в поддержку.<br />Ответ придёт на электронную почту в
          течение 24 часов
        </p>
        <Textareas placeholder="Введите ваше обращение" label="Обращение" />
      </div>

      <btn
        name="Отправить"
        theme="primary"
        size="large"
        style="justify-content: center"
        icon="right"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import btn from "~/components/ui/buttons/btn.vue";
import Textareas from "~/components/ui/inputs/Textareas.vue";
import { ref } from "vue";

const questions = ref([
  { question: "Вопрос?", answer: "Ответ на первый вопрос." },
  { question: "Вопрос?", answer: "Ответ на второй вопрос." },
  { question: "Вопрос?", answer: "Ответ на третий вопрос." },
]);

const activeIndex = ref<number | null>(null);

const toggleAnswer = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped lang="scss">
.faq {
  padding-top: 3.2rem;

  @include bp($point_2) {
    padding-top: 0;
  }
  &-title {
    text-align: center;
    font-size: 2.4rem;
    margin-bottom: 2rem;
    font-weight: 500;
    font-family: $font_2;
  }

  .faq-item {
    border: 0.1rem solid #a2d0ff;
    border-radius: 2rem;

    overflow: hidden;

    @include bp($point_2) {
      border-radius: 1.6rem;
    }

    .faq-question {
      padding: 1.5rem 1.6rem;
      cursor: pointer;
      transition: background-color 0.3s;
      @include flex-space;
      font-size: 1.8rem;
      font-family: $font_2;
      position: relative;

      @include bp($point_2) {
        font-size: 1.4rem;
      }
    }

    .faq-answer {
      font-size: 1.6rem;
      font-family: $font_2;
      font-weight: 500;
      color: $gray;
      padding: 0 1.6rem 1.6rem 1.6rem;

      @include bp($point_2) {
        font-size: 1.4rem;
      }
    }
  }
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin-bottom: 3.2rem;

  @include bp($point_2) {
    gap: 1rem;
  }
}

.faq-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1.6rem;
  @include flex-center;
}

.faq-support {
  margin-bottom: 2.4rem;
  p {
    text-align: center;
    font-size: 1.8rem;
    color: $dark;
    margin-bottom: 2.4rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
}
</style>
