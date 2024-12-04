<template>
  <div class="faq">
    <h2 class="faq-title">Часто задаваемые вопросы</h2>

    <div class="faq-item" v-for="(item, index) in questions" :key="index">
      <div class="faq-question" @click="toggleAnswer(index)">
        {{ item.question }}
        <span class="faq-icon" :class="{ open: activeIndex === index }">+</span>
      </div>
      <div class="faq-answer" v-if="activeIndex === index">
        {{ item.answer }}
      </div>
    </div>

    <div class="faq-support">
      <p>Задайте вопрос в поддержку.<br />Ответ придёт на электронную почту в течение 24 часов</p>
      <a href="#" class="faq-link">Обращение</a>
    </div>

    <btn name="Отправить →" theme="primary" size="large" />
  </div>
</template>

<script setup lang="ts">
import btn from '~/components/ui/buttons/btn.vue';
import { ref } from 'vue';

const questions = ref([
  { question: 'Вопрос?', answer: 'Ответ на первый вопрос.' },
  { question: 'Вопрос?', answer: 'Ответ на второй вопрос.' },
  { question: 'Вопрос?', answer: 'Ответ на третий вопрос.' },
]);

const activeIndex = ref<number | null>(null);

const toggleAnswer = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped lang="scss">
.faq {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  &-title {
    text-align: center;
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }

  .faq-item {
    border: 1px solid #e0e0e0;
    border-radius: 1rem;
    margin-bottom: 1rem;
    overflow: hidden;

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 1.6rem;
      font-size: 1.6rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f5f5f5;
      }

      .faq-icon {
        font-size: 2rem;
        color: #007bff;
        transform: rotate(0);
        transition: transform 0.3s;

        &.open {
          transform: rotate(45deg);
        }
      }
    }

    .faq-answer {
      padding: 1.2rem 1.6rem;
      font-size: 1.4rem;
      color: #555;
      border-top: 1px solid #e0e0e0;
      background-color: #f9f9f9;
    }
  }

  .faq-support {
    text-align: center;
    margin: 2rem 0;

    p {
      color: #555;
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }

    .faq-link {
      color: #007bff;
      text-decoration: none;
      font-size: 1.6rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>